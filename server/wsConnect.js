const { BreakfastDiningOutlined } = require("@mui/icons-material");
const model = require("./database/mongo/model");

//import { TeamModel, RequestModel, BoardModel} from "./database/mongo/model";
const board = [
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "1" },
  { name: "Afuayy", tag: "Arduino", left: "5", v: true, ID: "2" },
  { name: "Buatsnd", tag: "Arduino", left: "1", v: true, ID: "3" },
  { name: "Busaihsd", tag: "Arduino", left: "5", v: true, ID: "4" },
  { name: "CAHDAOEIH", tag: "Arduino", left: "2", v: true, ID: "5" },
  { name: "alh kuehru", tag: "Arduino", left: "0", v: true, ID: "6" },
  { name: "Buatsnd2", tag: "Arduino", left: "5", v: true, ID: "7" },
  { name: "Buatsnd3", tag: "Arduino", left: "1", v: true, ID: "8" },
  { name: "Buatsnd4", tag: "Arduino", left: "3", v: true, ID: "9" },
  { name: "Afuayy2", tag: "Arduino", left: "5", v: true, ID: "10" },
  { name: "Afuayy3", tag: "Arduino", left: "2", v: true, ID: "11" },
  { name: "Afuayy4", tag: "Arduino", left: "2", v: true, ID: "13" },
  { name: "Afuayy5", tag: "Arduino", left: "5", v: true, ID: "14" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "15" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "16" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "17" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "0", v: true, ID: "18" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "19" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "20" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "3", v: true, ID: "21" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "22" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "23" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: false, ID: "24" },
];
const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

module.exports = {
  onMessage: (ws) => async (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    console.log(task, payload);
    switch (task) {
      case "GETUSER": {
        const userData = await model.TeamModel.find({ teamID: payload });
        sendData(["GETUSER", userData], ws);
        sendStatus(["success", "Get successfully"], ws);
        break;
      }

      case "TEST": {
        sendData(["INITUSER", board], ws);
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
        let count = await model.RequestModel.find({
          borrower: group,
        }).count();

        let body = requestBody.map((e) => {
          return { board: e[0], quantity: e[1] };
        });

        const request = new model.RequestModel({
          requestID: "Group" + group + "_request" + (count + 1),
          borrower: group,
          sendingTime: new Date(),
          status: "unsolved",
          requestBody: body,
        });

        try {
          await request.save(); // Save payload to DB
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }

        // let c = await model.RequestModel.find({})
        // console.log(c);
        break;
      }
    }
  },
};
