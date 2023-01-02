// const React = require("react");

//import { useState, createContext, useContext, useEffect } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import useBreakpoints from "./useBreakpoints";
const client = new WebSocket("ws://localhost:4000"); //step 2

const MakeNTUContext = React.createContext({
  dataINIT: () => {},
  WSINIT: () => {},
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
  userRequest: [],
  getUser: () => {},
  userCards: [],
  requestData: [],
  getRequest: () => {},
  updateReq: () => {},
  updateReturn: () => {},
  teamReqUpdateDate: [],
  breakpoints: {},
  handleReplaceBoard: () => {},
  breakpoints: {},
  cancelRequest: () => {},
  deleteRequestFromUser: () => {},
  requestExpired: () => {},
});

const MakeNTUProvider = (props) => {
  const [alert, setAlert] = React.useState({});
  const [addBoardData, setAddBoardData] = React.useState({});
  const [getBoardData, setGetBoardData] = React.useState([]);
  const [updateBoardStatus, setUpdateBoardStatus] = React.useState("");
  const [userCards, setUserCards] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);

  const [requestData, setRequestData] = React.useState([]);
  const [teamReqUpdateDate, setTeamReqUpdateDate] = React.useState([]);
  const [userRequest, setUserRequest] = React.useState([]);
  const breakpoints = useBreakpoints();
  client.onmessage = async (byteString) => {
    //收回傳訊息
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);

    console.log(task, payload);
    switch (task) {
      case "REQUESTEXPIRED": {
        getUser(payload);
        break;
      }
      case "DELETEREQUESTFROMUSER": {
        getUser(payload);
        break;
      }
      case "CANCELREQUEST": {
        setUserData(payload);
        //im not sure what to do
        break;
      }
      case "GETUSER": {
        setUserRequest(payload.userRequest);
        if (payload.userCards) setUserCards(payload.userCards);
        else setUserCards([]);
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
      case "status": {
        const [msgStatus, msg] = payload;
        showAlert(msgStatus, msg);
        //setStatus(payload);
        break;
      }
      case "AddBoard": {
        setGetBoardData(payload);
        setCardData(payload);
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
      case "UPDATEREQUEST": {
        setRequestData(payload);
        break;
      }
      case "UPDATERETURN": {
        setTeamReqUpdateDate(payload);
        break;
      }
      default:
        break;
    }
  };
  client.onclose = () => {
    showAlert("error", "Connection Error. Please Refresh Later!");
  };
  const dataINIT = () => {
    const newCard = {
      limit: 5,
      category: "arduino",
      totalNum: 50,
      remain: 50,
      image: "",
    };
    addBoard({ ...newCard, name: "board 1", id: uuidv4() });
    addBoard({ ...newCard, name: "board 2", id: uuidv4() });
    addBoard({ ...newCard, name: "board 3", id: uuidv4() });
    addBoard({ ...newCard, name: "board 4", id: uuidv4() });
    addBoard({ ...newCard, name: "board 5", id: uuidv4() });
    sendData([
      "REQUEST",
      {
        group: "1",
        requestBody: [
          ["board 1", 2],
          ["board 2", 3],
        ],
      },
    ]);
    sendData([
      "REQUEST",
      {
        group: "1",
        requestBody: [
          ["board 1", 2],
          ["board 3", 3],
        ],
      },
    ]);
    sendData([
      "REQUEST",
      {
        group: "3",
        requestBody: [
          ["board 3", 2],
          ["board 1", 1],
        ],
      },
    ]);
  };

  const sendData = (data) => {
    client.send(JSON.stringify(data));
  };
  const showAlert = (severity, msg, duration) => {
    //success,error
    setAlert({ open: true, severity, msg, duration });
  };
  const WSINIT = (payload) => {
    sendData(["WSINIT", payload]);
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
  const updateReq = (payload) => {
    //{ requestID, requestStatus }
    sendData(["UPDATEREQ", payload]);
  };
  const getBoards = () => {
    sendData(["GETBOARD"]);
  };
  const getUser = (payload) => {
    sendData(["GETUSER", payload]);
  };
  const cancelRequest = (payload) => {
    sendData(["CANCELREQUEST", payload]);
  };
  const deleteRequestFromUser = (payload) => {
    sendData(["DELETEREQUESTFROMUSER", payload]);
  };
  const requestExpired = (payload) => {
    sendData(["REQUESTEXPIRED", payload]);
  };
  const getRequest = (payload) => {
    sendData(["GETREQUEST", payload]);
  };
  const updateReturn = (payload) => {
    sendData(["UPDATERETURN", payload]);
  };
  const handleReplaceBoard = (payload) => {
    sendData(["REPLACEBOARD", payload]);
  };
  return (
    <MakeNTUContext.Provider
      value={{
        dataINIT,
        userBoardINIT,
        WSINIT,
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
        userRequest,
        getRequest,
        userCards,
        cancelRequest,
        deleteRequestFromUser,
        requestExpired,
        breakpoints,
        handleReplaceBoard,
        updateReq,
        updateReturn,
        requestData,
        teamReqUpdateDate,
      }}
      {...props}
    />
  );
};

const useMakeNTU = () => React.useContext(MakeNTUContext);

export { MakeNTUProvider, useMakeNTU };
