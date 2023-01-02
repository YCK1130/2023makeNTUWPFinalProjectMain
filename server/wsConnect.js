const { BreakfastDiningOutlined } = require("@mui/icons-material");
const model = require("./database/mongo/model");
//import { TeamModel, RequestModel, BoardModel} from "./database/mongo/model";

const userID = {}; //記ws是哪個group => 給需要呼叫該組時
const userAuth = {}; //記ws的authority => 給需要更新data時
const userPage = {}; //記ws現在在哪個page => 給需要更新data時

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

const broadcastPage = (page, data) => {
  //console.log(userPage[page]);
  if (userPage[page]) {
    userPage[page].forEach((client) => {
      sendData(data, client);
    });
  }
};
const broadcastID = (ID, data) => {
  //console.log(userPage[page]);
  if (userID[ID]) {
    userID[ID].forEach((client) => {
      sendData(data, client);
    });
  }
};
const broadcastAuth = (authority, data) => {
  //console.log(userPage[page]);
  if (userAuth[authority]) {
    userAuth[authority].forEach((client) => {
      sendData(data, client);
    });
  }
};
const getIntersection = (setA, setB) => {
  if (!setA) return setB;
  if (!setB) return setA;
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element))
  );

  return intersection;
};

const broadcast = (condictions, data) => {
  const { id, authority, page } = condictions;
  const IdSet = id ? userID[id] : undefined;
  const AuthSet = authority ? userAuth[authority] : undefined;
  const PageSet = page ? userPage[page] : undefined;
  let validSet = getIntersection(getIntersection(IdSet, AuthSet), PageSet);
  if (!id && !authority && !page) {
    validSet = [];
    for (const [key, value] of Object.entries(userID)) {
      validSet = [...validSet, ...value];
    }
    for (const [key, value] of Object.entries(userAuth)) {
      validSet = [...validSet, ...value];
    }
    for (const [key, value] of Object.entries(userPage)) {
      validSet = [...validSet, ...value];
    }
    validSet = new Set(validSet);
  }
  validSet.forEach((client) => {
    sendData(data, client);
  });
};
const changeBoardRemain = async (req) => {
  try {
    req.requestBody.map(async (re) => {
      let board = await model.BoardModel.findOne({ name: re.board });
      await model.BoardModel.updateOne(
        { name: re.board },
        { $set: { remain: board.remain + re.quantity } }
      );
    });
  } catch (e) {
    throw new Error("Message DB save error: " + e);
  }
  const newBoard = await model.BoardModel.find({});
  broadcastPage("userProgress", ["AddBoard", newBoard]);
};

const requestExpired = async (id, status) => {
  let request = await model.RequestModel.findOne({ requestID: id });
  if (request.status === status) {
    await model.RequestModel.updateOne(
      { requestID: id },
      { $set: { status: "expired" } }
    );
  }
  await changeBoardRemain(request);
  // broadcastPage("requestStatus", ["AddBoard", newBoard]);
  return;
};
const updateMyCards = async (group, request) => {
  let gp = await model.TeamModel.findOne({ teamID: group });

  await Promise.all(
    request.map(async (e) => {
      (await gp.myCards.has(e[0]))
        ? await gp.myCards.set(e[0], gp.myCards.get(e[0]) + e[1])
        : await gp.myCards.set(e[0], e[1]);
    })
  );
  await gp.save();
  // console.log(gp.myCards);
  //console.log(gp, "hi");
};

module.exports = {
  onMessage: (ws) => async (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    console.log(task, payload);

    switch (task) {
      case "WSINIT": {
        const { id, authority } = payload;
        if (userPage[ws.box]) userPage[ws.box].delete(ws);
        if (userID[ws.id]) userID[ws.id].delete(ws);
        if (userAuth[ws.authority]) userAuth[ws.authority].delete(ws);

        if (!userID[id]) userID[id] = new Set();
        userID[id].add(ws);
        ws.id = id;
        if (!userAuth[authority]) userAuth[authority] = new Set();
        userAuth[authority].add(ws);
        ws.authority = authority;
        if (!userPage["main"]) userPage["main"] = new Set();
        userPage["main"].add(ws);
        ws.box = "main";

        console.log(id, authority);
        console.log("change page to " + ws.box);
        break;
      }
      case "SUBSCRIBE": {
        //userStatus & userProgress & adminBoardList
        if (userPage[ws.box]) {
          userPage[ws.box].delete(ws);
        }
        if (!userPage[payload]) userPage[payload] = new Set();
        userPage[payload].add(ws);
        ws.box = payload;
        console.log("change page to " + ws.box);
        break;
      }

      case "DELETEREQUESTFROMUSER": {
        let userData = await model.TeamModel.findOne({ teamID: payload[0] });

        let newRequest = userData.requests;
        const newR = newRequest.filter(
          (re) => String(re._id) !== String(payload[1])
        );
        await model.TeamModel.updateOne(
          { teamID: payload[0] },
          { $set: { requests: newR } }
        );
        await userData.populate("requests").execPopulate();
        broadcastPage("userStatus", ["GETUSER", userData]);
        break;
      }
      case "CANCELREQUEST": {
        let userData = await model.TeamModel.findOne({ teamID: payload[0] });
        await model.RequestModel.updateOne(
          { _id: payload[1] },
          { $set: { status: "cancel" } }
        );
        let request = await model.RequestModel.findById(payload[1]);
        await changeBoardRemain(request);
        await userData.populate("requests").execPopulate();
        //broadcastPage("requestStatus", ["AddBoard", newBoard]);
        broadcastPage("userStatus", ["GETUSER", userData]);
        break;
      }
      case "GETUSER": {
        let userData = await model.TeamModel.findOne({ teamID: payload });
        await userData.populate("requests").execPopulate();
        sendData(["GETUSER", userData], ws);
        // sendStatus(["success", "Get successfully"], ws);
        break;
      }
      case "INITUSERCARD": {
        const boards = await model.BoardModel.find({});
        sendData(["INITUSERCARD", boards], ws);
        // sendStatus(["success", "Get successfully"], ws);
        break;
      }
      case "ADDBOARD": {
        const newData = payload;
        // console.log(group);
        // console.log(requestBody);
        const existing = await model.BoardModel.find({
          name: newData.name,
        });
        // console.log(existing);
        if (existing.length !== 0) {
          sendStatus(["error", `${newData.name} already exist.`], ws);
          break;
        }
        try {
          const temp = await new model.BoardModel(payload).save();
          const newBoard = await model.BoardModel.find({});
          console.log(newBoard);
          broadcastPage("adminBoardList", ["AddBoard", newBoard]);
          broadcastPage("userProgress", ["AddBoard", newBoard]);
          //sendData(["AddBoard", newBoard], ws);
          sendStatus(["success", "Add successfully"], ws);
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        // let c = await model.BoardModel.find({});
        break;
      }
      case "UPDATEBOARDS": {
        const newData = payload;
        try {
          await Promise.all(
            newData.map(
              async (board) =>
                await model.BoardModel.replaceOne(
                  {
                    name: board.name,
                  },
                  board,
                  { upsert: true }
                )
            )
          );
          sendStatus(["success", "Update successfully"], ws);
          const boards = await model.BoardModel.find({});
          sendData(["UpdateBoard", { status: "success", data: boards }], ws);
        } catch (e) {
          throw new Error("Message DB update error: " + e);
        }
        break;
      }
      case "DELETEBOARD": {
        const newDataID = payload;
        // console.log(group);
        // console.log(requestBody);
        const existing = await model.BoardModel.deleteOne({
          id: newDataID,
        });
        // console.log(existing);
        sendStatus(["success", "Delete successfully"], ws);
        break;
      }
      case "GETBOARD": {
        const boards = await model.BoardModel.find({});
        // console.log(boards);
        sendData(["GETBOARD", boards], ws);
        sendStatus(["success", "Get successfully"], ws);
        break;
      }
      case "GETREQUEST": {
        //need populate
        const requests = await model.RequestModel.find().populate(["borrower"]);
        // await requests..execPopulate();
        // console.log(requests);
        sendData(["GETREQUEST", requests], ws);
        sendStatus(["success", "Get successfully"], ws);
        break;
      }
      case "REQUEST": {
        let { group, requestBody } = payload;
        // console.log(group);
        // console.log(requestBody);

        let gp = await model.TeamModel.findOne({ teamID: group });

        let count = await model.RequestModel.find({
          borrower: gp,
        }).count();

        let body = requestBody.map((e) => {
          return { board: e[0], quantity: e[1] };
        });

        const request = new model.RequestModel({
          requestID: "Group" + group + "_request" + (count + 1),
          borrower: gp,
          sendingTime: new Date().getTime(),
          status: "pending",
          requestBody: body,
        });
        setTimeout(
          () =>
            requestExpired(
              "Group" + group + "_request" + (count + 1),
              "pending"
            ),
          15 * 60 * 1000
        );
        try {
          await request.save(); // Save payload to DB
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }

        await updateMyCards(group, requestBody);
        await model.TeamModel.updateMany(
          { teamID: group },
          { $push: { requests: request } }
        );
        const requests = await model.RequestModel.find().populate(["borrower"]);
        // console.log(requests);
        broadcastAuth(1, ["status", ["success", "New Request come in!"]]);
        broadcast({ authority: 1, page: "requestStatus" }, [
          "UPDATEREQUEST",
          requests,
        ]);
        sendStatus(["success", "Request successfully"], ws);

        // updateMyCards(group, requestBody);

        // let c = await model.TeamModel.findOne({teamID: group});
        // console.log(c);
        break;
      }
      case "UPDATEREQ": {
        const { requestID, requestStatus } = payload;
        await model.RequestModel.updateOne(
          { _id: requestID },
          { $set: { status: requestStatus } }
        );
        const newReq = await model.RequestModel.findOne({
          _id: requestID,
        }).populate(["borrower"]);
        // console.log(newReq);

        if (requestStatus === "ready") {
          await model.RequestModel.updateOne(
            { _id: requestID },
            {
              $set: {
                status: requestStatus,
                sendingTime: new Date().getTime(),
              },
            }
          );
          setTimeout(
            () => requestExpired(newReq.requestID, "ready"),
            15 * 60 * 1000
          );
        }
        if (requestStatus === "solved") {
          await Promise.all(
            newReq.requestBody.map(async (board) => {
              const myboard = await model.BoardModel.findOne({
                name: board.board,
              });
              let found = false;
              let newInvoice = myboard.invoice.map((item) => {
                if (String(newReq.borrower._id) === String(item.group)) {
                  found = true;
                  return {
                    group: item.group,
                    number: item.number + board.quantity,
                  };
                } else {
                  return item;
                }
              });
              if (!found) {
                newInvoice = [
                  ...myboard.invoice,
                  { group: newReq.borrower._id, number: board.quantity },
                ];
              }
              // console.log("newInvoice: ", board, newInvoice);
              myboard.invoice = newInvoice;
              myboard.remain -= board.quantity;
              await myboard.save();
            })
          );
          const boards = await model.BoardModel.find({});
          console.log(boards);
        }
        const requests = await model.RequestModel.find().populate(["borrower"]);
        sendData(["UPDATEREQUEST", requests], ws);
        broadcast({ authority: 1, page: "requestStatus" }, [
          "UPDATEREQUEST",
          requests,
        ]);
        sendStatus(["success", "Update successfully"], ws);
        break;
      }
      case "UPDATERETURN": {
        const { id, returned } = payload;
        console.log(id, returned);
        const team = await model.TeamModel.findOne({ teamID: id });
        const teamsCard = JSON.parse(JSON.stringify(team.myCards));
        console.log(teamsCard);
        for (const [key, value] of Object.entries(returned)) {
          teamsCard[key] -= value;
          const myboard = await model.BoardModel.findOne({
            name: key,
          });
          myboard.remain += value;
          const newInvoice = myboard.invoice.map((item) => {
            if (String(item.group) === String(team._id))
              return { group: item.group, number: item.number - value };
            else return item;
          });
          myboard.invoice = newInvoice.filter((item) => item.number > 0);
          // console.log(myboard.invoice);
          await myboard.save();
          // console.log(myboard.invoice);
          if (teamsCard[key] === 0) delete teamsCard[key];
        }
        team.myCards = teamsCard;
        await team.save();
        // console.log(team.myCards);
        const teams = await model.TeamModel.find({});

        sendData(["UPDATERETURN", teams], ws);
        sendStatus(["success", "Update successfully"], ws);
        break;
      }
      case "REPLACEBOARD": {
        await model.BoardModel.deleteMany({});
        await model.RequestModel.deleteMany({});
        await model.TeamModel.updateMany(
          { authority: 0 },
          { $set: { myCards: {}, request: [] } }
        );

        console.log(payload);
        const newBoards = await Promise.all(
          payload.map(async (newBoard) => {
            const saveBoard = await new model.BoardModel(newBoard).save();
            return saveBoard;
          })
        );
        sendData(["GETBOARD", newBoards], ws);
        sendStatus(["success", "Reset successfully"], ws);
        break;
      }
    }
  },
};
