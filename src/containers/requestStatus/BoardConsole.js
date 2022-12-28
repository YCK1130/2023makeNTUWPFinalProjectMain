import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Paper, Typography, Box } from "@mui/material/";
import { Link, useHistory } from "react-router-dom";
import { selectSession } from "../../slices/sessionSlice";
import AdminCard from "../../components/adminCard";
import styled from "styled-components";
import TemplateCard from "../../components/templateCard";
import { v4 as uuidv4 } from "uuid";

/**
 * This is Main Page
 */

const Wrapper = styled.div`
  width: 100%;
  height: 65vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  // overflow-y: scroll;
`;
const someCards = [
  {
    id: 1,
    name: "aaa",
    limit: 5,
    totalNum: 10,
    remain: 3,
    image: "",
  },
  {
    id: 2,
    name: "bbb",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 3,
    name: "ccc",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 4,
    name: "ddd",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 11,
    name: "a",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 21,
    name: "b",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 31,
    name: "c",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
  {
    id: 41,
    name: "d",
    limit: 5,
    remain: 3,
    totalNum: 10,
    category: "test",
    image: "",
  },
];
export default function BoardConsole({ keyWord }) {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [addCardData, setAddCardData] = useState({});
  const [delCardID, setDelCardID] = useState(0);
  const [changedData, setChangedData] = useState([]);
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      width: "100%",
      height: "80vh",
      overflow: "auto",
    },
    paper: {
      background: "rgb(0,0,0,.0)",
      boxShadow: "none",
    },
    text: {
      margin: "auto",
      textAlign: "start",
      width: "80%",
    },
    time: {
      margin: "auto",
      color: "#F5DE83",
      textAlign: "end",
      width: "70%",
      fontWeight: "400",
    },
  }));
  useEffect(() => {
    setCards(someCards);
  }, []);

  const updateData = () => {
    console.log("updating");
  };
  useEffect(() => {
    console.log(changedData);
  }, [changedData]);

  useEffect(() => {
    const exist = cards.filter((card) => card.name === addCardData.name);
    if (exist.length !== 0 || addCardData.name === undefined) {
      console.log("existed");
      return;
    }
    console.log("handling", addCardData);
    setCards([
      {
        ...addCardData,
        id: uuidv4(),
        remain: 3,
        image: "",
      },
      ...cards,
    ]);
    setAddCardData({});
  }, [addCardData]);

  useEffect(() => {
    if (cards.length === 0) return;
    const exist = cards.filter((card) => card.id === delCardID);
    const remainCards = cards.filter((card) => card.id !== delCardID);

    console.log("deleting", exist);
    setCards(remainCards);
  }, [delCardID]);

  const classes = useStyles();
  const { isLogin } = useSelector(selectSession);
  return (
    <Wrapper>
      <Box
        sx={{
          width: "80%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          overflowY: "scroll",
          borderRadius: "5px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {<TemplateCard setAddCardData={setAddCardData} />}
        {cards.map((card) => {
          return (
            <AdminCard
              key={card?.name + card?.id}
              data={card}
              handleDeleteCard={setDelCardID}
              changedData={changedData}
              setChangedData={setChangedData}
            ></AdminCard>
          );
        })}
      </Box>
    </Wrapper>
  );
}
