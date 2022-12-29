const React = require("react")

//import { useState, createContext, useContext, useEffect } from "react";

const client = new WebSocket("ws://localhost:4000"); //step 2

const MakeNTUContext = React.createContext({
	sendMessage: () => {},
	sendData: () => {},
});

const MakeNTUProvider = (props) => {

	const [cardData, setCardData] = React.useState([]);

	client.onmessage = async (byteString) => {
		//收回傳訊息
		const { data } = byteString;
		const [task, payload] = JSON.parse(data);
		
		switch (task) {
			case "INITUSER": {
				setCardData(payload);
				console.log(payload);
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
				sendData,
				cardData,
			}}
			{...props}
		/>
	);
};

const useMakeNTU = () => React.useContext(MakeNTUContext);

export { MakeNTUProvider, useMakeNTU };