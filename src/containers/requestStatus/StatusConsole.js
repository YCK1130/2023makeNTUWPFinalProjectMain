import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
} from "@mui/material/";
import { Link, useHistory } from "react-router-dom";
import { selectSession } from "../../slices/sessionSlice";
import Request from "../../components/request";
import AdminCard from "../../components/adminCard";
import styled from "styled-components";
import TemplateCard from "../../components/templateCard";
import { v4 as uuidv4 } from "uuid";
import BoardRequest from "./components/BoardRequest";
import GroupStatus from "./components/GroupStatus";
import { StudentDataAPI } from "../../api";

/**
 * This is Main Page
 */

const Wrapper = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
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
export default function StatusConsole() {
  const history = useHistory();
  const [userStatus, setUserStatus] = useState([]);
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
  useEffect(async () => {
    //獲取user資料
    console.log("fetching data...");
    const { data: userData } = await StudentDataAPI.getStudentData();
    console.log(userData);
    setUserStatus(userData);
  }, []);

  useEffect(() => {
    console.log(changedData);
  }, [changedData]);

  const classes = useStyles();
  const { isLogin } = useSelector(selectSession);
  return (
    <Wrapper>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          overflowX: "hidden",
          borderRadius: "5px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "middle",
                  maxHeight: "10vh",
                }}
              >
                <TableCell />
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "h5.fontSize",
                  }}
                  align="center"
                >
                  TEAM STATE
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {userStatus?.map((team) => {
                return (
                  <BoardRequest
                    key={team?.name + team?.id}
                    team={team}
                  ></BoardRequest>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Wrapper>
  );
}
