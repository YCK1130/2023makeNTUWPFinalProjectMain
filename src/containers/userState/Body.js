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
function createData(id, state, timing) {
  return {
    id,
    state,
    timing,
    details: [
      { stuff: "開發板1", amount: "3個" },
      { stuff: "開發板7", amount: "8個" },
    ],
  };
}
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

const rows = [
  createData(1, "pending", "timing"),
  createData(2, "pending", "timing"),
  createData(3, "canTake", "timing"),
  createData(4, "pending", "timing"),
  createData(5, "canTake", "timing"),
];
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
          justifyContent: "space-around",
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
        }
      </Box>
    </Wrapper>
  );
}

export default Body;
