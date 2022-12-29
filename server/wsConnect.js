const { BreakfastDiningOutlined } = require("@mui/icons-material");
const model = require("./database/mongo/model");

//import { TeamModel, RequestModel, BoardModel} from "./database/mongo/model";
const board = [
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "1" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "2" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "3" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "4" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "5" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "0", v: true, ID: "6" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "7" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "8" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "3", v: true, ID: "9" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "10" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "11" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "13" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "14" },
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

		switch (task) {
			case "TEST": {
                sendData(["INITUSER", board],ws);
                break;
            };
            case "REQUEST":{
                let { group, requestBody } = payload;
                // console.log(group);
                // console.log(requestBody);
                let count = await model.RequestModel.find({
					borrower: group,
				}).count();

                let body = requestBody.map((e) =>{
                    return {board:e[0], quantity:e[1]}
                })
                
                const request = new model.RequestModel({
					requestID: ("Group" + group + "_request" + (count + 1)),
                    borrower: group,
                    sendingTime: new Date,
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
    }
}