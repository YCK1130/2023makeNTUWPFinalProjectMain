import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./UserRow";
import Box from "@mui/material/Box";
import styled from "styled-components";
import BoardRequest from "./BoardRequest";
import GroupStatus from "./GroupStatus";
function createData(id, status, timing) {
  return {
    id,
    status,
    timing,
    details: [
      { stuff: "開發板1", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板1", amount: "3個" },
      { stuff: "開發板4", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
    ],
  };
}

const rows = [
  createData(1, "pending", "timing"),
  createData(2, "pending", "timing"),
  createData(3, "canTake", "timing"),
  createData(4, "pending", "timing"),
  createData(5, "canTake", "timing"),
];
function createData2(group) {
  return {
    group,

    details: [
      { stuff: "開發板1", amount: 3, return: 0 },
      { stuff: "開發板7", amount: 6, return: 0 },
      { stuff: "開發板13", amount: 7, return: 0 },
      { stuff: "開發板4", amount: 3, return: 0 },
      { stuff: "開發板6", amount: 4, return: 0 },
      { stuff: "開發板23", amount: 44, return: 0 },
      { stuff: "開發板62", amount: 3, return: 0 },
      { stuff: "開發板71", amount: 4, return: 0 },
      { stuff: "開發板63", amount: 4, return: 0 },
      { stuff: "開發板72", amount: 3, return: 0 },
    ],
  };
}

const rows2 = [
  createData2(1),
  createData2(2),
  createData2(3),
  createData2(4),
  createData2(5),
];
function createData3(group, status, timing) {
  return {
    group,
    status,
    timing,
    details: [
      { stuff: "開發板1", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板1", amount: "3個" },
      { stuff: "開發板4", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
      { stuff: "開發板6", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
    ],
  };
}

const rows3 = [
  createData3(1, "pending", "timing"),
  createData3(2, "pending", "timing"),
  createData3(3, "canTake", "timing"),
  createData3(4, "pending", "timing"),
  createData3(5, "canTake", "timing"),
];
const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  //overflow-y: scroll;
`;
function Body() {
  return (
    <Wrapper>
      <Box
        sx={{
          width: "80%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          overflowY: "scroll",
          borderRadius: "5px",
          flexWrap: "wrap",
          // justifyContent: "space-around",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            //margin: "5px",
            width: "35%",
            height: "100%",
            backgroundColor: "rgba(38,43,50)",
            overflowY: "scroll",
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
                      fontSize: "h4.fontSize",
                    }}
                    align="center"
                  >
                    STATE
                  </TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {
          //for cards
          <Box
            sx={{
              //margin: "5px",
              width: "45%",
              height: "100%",
              backgroundColor: "rgba(38,43,50)",
              overflowY: "scroll",
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
                        fontSize: "h4.fontSize",
                      }}
                      align="center"
                    >
                      STATE
                    </TableCell>

                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows3.map((row) => (
                    <GroupStatus key={row.group} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        }
      </Box>
    </Wrapper>
  );
}

export default Body;
