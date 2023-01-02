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
  console.log(gp.myCards);
  //console.log(gp, "hi");
};

module.exports = {
  onMessage: (ws) => async (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    console.log(task, payload);
    
    switch (task) {
      case "WSINIT" : {
        const { id, authority } = payload;
        if (!userID[id]) userID[id] = new Set();
				userID[id].add(ws);
        if (!userAuth[authority]) userAuth[authority] = new Set();
				userAuth[authority].add(ws);
        if (!userPage["main"]) userPage["main"] = new Set();
				userPage["main"].add(ws);
        ws.box = "main";

        console.log(id,authority)
        console.log("change page to "+ws.box)
        break;
      }
      case "GETUSER": {
        if(userPage[ws.box]){
          userPage[ws.box].delete(ws);
        }
        if (!userPage["userStatus"]) userPage["userStatus"] = new Set();
				userPage["userStatus"].add(ws);
        ws.box = "userStatus";
        console.log("change page to "+ws.box)

        let userData = await model.TeamModel.findOne({ teamID: payload });
        await userData.populate("requests").execPopulate();
        console.log(userData.requests);
        sendData(["GETUSER", userData.requests], ws);
        // sendStatus(["success", "Get successfully"], ws);
        break;
      }

      case "INITUSERCARD": {
        if(userPage[ws.box]){
          userPage[ws.box].delete(ws);
        }
        if (!userPage["userProgress"]) userPage["userProgress"] = new Set();
				userPage["userProgress"].add(ws);
        ws.box = "userProgress";
        console.log("change page to "+ws.box)

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
          const newBoard = await new model.BoardModel(payload).save();
          sendData(["AddBoard", newBoard], ws);
          sendStatus(["success", "Add successfully"], ws);

          console.log(newBoard);
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
        if(userPage[ws.box]){
          userPage[ws.box].delete(ws);
        }
        if (!userPage["adminBoardList"]) userPage["adminBoardList"] = new Set();
				userPage["adminBoardList"].add(ws);
        ws.box = "adminBoardList";
        console.log("change page to "+ws.box)

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

        try {
          await request.save(); // Save payload to DB
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }

        await model.TeamModel.updateMany(
          { teamID: group },
          { $push: { requests: request } }
        );

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
        if (requestStatus === "solved") {
          let body = newReq.requestBody.map((e) => {
            return [e.board, e.quantity];
          });
          await updateMyCards(newReq.borrower.teamID, body);
          let gp = await model.TeamModel.findOne({
            teamID: newReq.borrower.teamID,
          });
          // await Promise.all(
          //   newReq.requestBody.map(async (board) => {
          //     await model.BoardModel.updateOne(
          //       { name: board.board },
          //       { $inc: { remain: -board.quantity } }
          //     );
          //   })
          // );
          await Promise.all(
            newReq.requestBody.map(async (board) => {
              const myboard = await model.BoardModel.findOne({
                name: board.board,
              });
              let found = false;
              let newInvoice = myboard.invoice.map((item) => {
                // console.log(
                //   "newInvoice",
                //   newReq.borrower._id,
                //   item.group,
                //   String(newReq.borrower._id) === String(item.group)
                // );
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
          console.log(myboard.invoice);
          await myboard.save();
          console.log(myboard.invoice);
          if (teamsCard[key] === 0) delete teamsCard[key];
        }
        team.myCards = teamsCard;
        await team.save();
        // console.log(team.myCards);
        const teams = await model.TeamModel.find({});

        sendData(["UPDATERETURN", teams], ws);
        sendStatus(["success", "Update successfully"], ws);
      }
    }
  },
};
