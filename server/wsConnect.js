const { BreakfastDiningOutlined } = require("@mui/icons-material");
const model = require("./database/mongo/model");

//import { TeamModel, RequestModel, BoardModel} from "./database/mongo/model";
const board = [
  { name: "A", tag: "Arduino", left: "2", v: true, ID: "1" },
  { name: "B", tag: "Arduino", left: "5", v: true, ID: "2" },
  { name: "C", tag: "Rpi", left: "1", v: true, ID: "3" },
  { name: "D", tag: "Rpi", left: "5", v: true, ID: "4" },
  { name: "E", tag: "Rpi", left: "2", v: true, ID: "5" },
  { name: "F", tag: "Arduino", left: "10", v: true, ID: "6" },
  { name: "G", tag: "Rpi", left: "5", v: true, ID: "7" },
  { name: "H", tag: "Arduino", left: "1", v: true, ID: "8" },
  { name: "I", tag: "Rpi", left: "3", v: true, ID: "9" },
  { name: "J", tag: "Arduino", left: "150", v: true, ID: "10" },
  { name: "K", tag: "Rpi", left: "2", v: true, ID: "11" },
  { name: "L", tag: "Arduino", left: "2", v: true, ID: "13" },
  { name: "M", tag: "Rpi", left: "5", v: true, ID: "14" },
  { name: "N", tag: "Arduino", left: "1", v: true, ID: "15" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: false, ID: "24" },
];
const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

const updateMyCards = async (group, request) => {
  let gp = await model.TeamModel.findOne({ teamID: group });

  request.map((e) => {
    gp.myCards.has(e[0])
      ? gp.myCards.set(e[0], gp.myCards.get(e[0]) + e[1])
      : gp.myCards.set(e[0], e[1]);
  });
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
      case "CANCELREQUEST": {
        let userData = await model.TeamModel.findOne({ teamID: payload[0] });
        await model.RequestModel.updateOne(
          { requestID: payload[1] },
          { $set: { status: "cancel" } }
        );

        break;
      }
      case "GETUSER": {
        let userData = await model.TeamModel.findOne({ teamID: payload });
        await userData.populate("requests").execPopulate();
        console.log(userData.requests);
        sendData(["GETUSER", userData.requests], ws);
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
        console.log(existing);
        sendStatus(["success", "Delete successfully"], ws);
        break;
      }
      case "GETBOARD": {
        const boards = await model.BoardModel.find({});
        sendData(["GETBOARD", boards], ws);
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
          status: "unsolved",
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

        updateMyCards(group, requestBody);

        // let c = await model.TeamModel.findOne({teamID: group});
        // console.log(c);
        break;
      }
    }
  },
};
