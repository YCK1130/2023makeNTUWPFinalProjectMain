import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Row from "./UserRow";
import Card from "./Cards";
import { useMakeNTU } from "../../hooks/useMakeNTU";
import { useSelector, useDispatch } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";
import { useEffect } from "react";
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

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  // overflow-y: hidden;
`;
function Body() {
  const { userData, getUser } = useMakeNTU();
  const { userID } = useSelector(selectSession);

  const renderPage = (id) => {
    getUser(id);
  };
  useEffect(() => {
    renderPage(userID);
  }, []);
  return (
    <Wrapper>
      <Box
        sx={{
          width: "80%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          overflowY: "hidden",
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
        }

        <Box
          sx={{
            //margin: "5px",
            width: "65%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.6)",
            overflowY: "scroll",
            borderRadius: "5px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "start",
          }}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </Box>
      </Box>
    </Wrapper>
  );
}

export default Body;
