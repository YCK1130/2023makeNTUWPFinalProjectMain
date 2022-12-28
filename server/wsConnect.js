const model = require("./database/mongo/model");

//import { TeamModel, RequestModel, BoardModel} from "./database/mongo/model";

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
                console.log(payload);
                console.log("ws success!");
            };
        }
    }
}