import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";
import styled from "styled-components";
import Request from "../../components/request";
import GroupStatus from "./components/GroupStatus";
const Wrapper = styled.div`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  border: 3px solid;
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: "100%", height: "90%" }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            paddingRight: "10px",
            overflowX: "hidden",
            borderRadius: "5px",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const someReqs = [
  {
    id: 1,
    name: "aaa",
    status: "solved",
  },
  {
    id: 2,
    name: "bbb",
    status: "unSolved",
  },
];
export default function RequestConsole() {
  const [value, setValue] = useState(0);
  const [requests, setRequests] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    //獲取user資料
    console.log("fetching data...");
    setRequests(someReqs);
  }, []);
  return (
    <Wrapper>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          borderBottom: 2,
          borderColor: "divider",
          backgroundColor: "rgba(0,0,0,0.1)",
          color: "primary",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="未完成" {...a11yProps(0)} />
          <Tab label="已完成" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer
          component={Paper}
          sx={{ overflowX: "hidden", overflowY: "auto" }}
        >
          <Table aria-label="collapsible table">
            <TableBody>
              {requests
                .filter(
                  (request) =>
                    request?.status?.toUpperCase() !== "solved".toUpperCase()
                )
                .map((request) => {
                  return (
                    <GroupStatus
                      key={request?.name + request?.id}
                      data={request}
                    ></GroupStatus>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer
          component={Paper}
          sx={{ overflowX: "hidden", overflowY: "auto" }}
        >
          <Table aria-label="collapsible table">
            <TableBody>
              {requests
                .filter(
                  (request) =>
                    request?.status?.toUpperCase() === "solved".toUpperCase()
                )
                .map((request) => {
                  return (
                    <GroupStatus
                      key={request?.name + request?.id}
                      data={request}
                    ></GroupStatus>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Wrapper>
  );
}
