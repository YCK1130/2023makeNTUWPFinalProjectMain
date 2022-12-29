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
                
                let c = await model.RequestModel.find({})
                console.log(c);
            }
        }
    }
}