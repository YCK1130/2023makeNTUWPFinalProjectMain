const React = require("react")

//import { useState, createContext, useContext, useEffect } from "react";

const client = new WebSocket("ws://localhost:4000"); //step 2

const MakeNTUContext = React.createContext({
	sendMessage: () => {},
});

const MakeNTUProvider = (props) => {

	client.onmessage = async (byteString) => {
		//收回傳訊息
		const { data } = byteString;
		const [task, payload] = JSON.parse(data);
		switch (task) {
			case "init": {
				//console.log(payload);
				//setMessages(payload);
				break;
			}
			case "output": {
				//setMessages(() => [...messages, ...payload]);
				break;
			}
			case "clear": {
				//setMessages(payload);
				break;
			}
			case "status": {
				//setStatus(payload);
				break;
			}
			default:
				break;
		}
	};

	const sendData = (data) => {
		client.send(JSON.stringify(data));
	};

	const sendMessage = (payload) => {
		sendData(["TEST", payload]);
	};

	return (
		<MakeNTUContext.Provider
			value={{
				sendMessage,
			}}
			{...props}
		/>
	);
};

const useMakeNTU = () => React.useContext(MakeNTUContext);

export { MakeNTUProvider, useMakeNTU };