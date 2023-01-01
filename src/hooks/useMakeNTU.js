const React = require("react");

//import { useState, createContext, useContext, useEffect } from "react";

const client = new WebSocket("ws://localhost:4000"); //step 2

const MakeNTUContext = React.createContext({
  userBoardINIT: () => {},
  sendData: () => {},
  cardData: [],
  addBoard: () => {},
  deleteBoard: () => {},
  updateBoards: () => {},
  getBoards: () => {},
  setUpdateBoardStatus: () => {},
  alert: {},
  addBoardData: {},
  getBoardData: [],
  updateBoardStatus: "",
  showAlert: () => {},
  setAlert: () => {},
  userData: [],
  getUser: () => {},
  requestData: [],
  getRequest: () => {},
});

const MakeNTUProvider = (props) => {
  const [alert, setAlert] = React.useState({});
  const [addBoardData, setAddBoardData] = React.useState({});
  const [getBoardData, setGetBoardData] = React.useState([]);
  const [updateBoardStatus, setUpdateBoardStatus] = React.useState("");

  const [cardData, setCardData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [requestData, setRequestData] = React.useState([]);
  client.onmessage = async (byteString) => {
    //收回傳訊息
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);

    console.log(task, payload);
    switch (task) {
      case "GETUSER": {
        setUserData(payload);
        break;
      }
      case "GETREQUEST": {
        setRequestData(payload);
        break;
      }
      case "INITUSERCARD": {
        setCardData(payload);
        console.log(payload);
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
        const [msgStatus, msg] = payload;
        showAlert(msgStatus, msg);
        //setStatus(payload);
        break;
      }
      case "AddBoard": {
        setAddBoardData(payload);
        break;
      }
      case "GETBOARD": {
        setGetBoardData(payload);
        setUpdateBoardStatus("");
        break;
      }
      case "UpdateBoard": {
        // console.log(payload);
        setUpdateBoardStatus(payload.status);
        if (payload.status === "success") setGetBoardData(payload.data);
        break;
      }
      default:
        break;
    }
  };
  client.onclose = () => {
    showAlert("error", "Connection Error. Please Refresh Later!");
  };
  const sendData = (data) => {
    client.send(JSON.stringify(data));
  };
  const showAlert = (severity, msg) => {
    //success,error
    setAlert({ open: true, severity, msg });
  };
  const userBoardINIT = (payload) => {
    sendData(["INITUSERCARD", payload]);
  };
  const addBoard = (payload) => {
    console.log("adding");
    sendData(["ADDBOARD", payload]); //Board data
  };
  const deleteBoard = (payload) => {
    sendData(["DELETEBOARD", payload]); //ID
  };
  const updateBoards = (payload) => {
    sendData(["UPDATEBOARDS", payload]); //[Board data]
  };
  const getBoards = () => {
    sendData(["GETBOARD"]);
  };
  const getUser = (payload) => {
    sendData(["GETUSER", payload]);
  };
  const getRequest = (payload) => {
    sendData(["GETREQUEST", payload]);
  };

  return (
    <MakeNTUContext.Provider
      value={{
        userBoardINIT,
        addBoard,
        deleteBoard,
        updateBoards,
        getBoards,
        setUpdateBoardStatus,
        alert,
        addBoardData,
        getBoardData,
        updateBoardStatus,
        showAlert,
        setAlert,
        sendData,
        cardData,
        getUser,
        userData,
        requestData,
        getRequest,
      }}
      {...props}
    />
  );
};

const useMakeNTU = () => React.useContext(MakeNTUContext);

export { MakeNTUProvider, useMakeNTU };
