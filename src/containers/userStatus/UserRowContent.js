import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";

import Box from "@mui/material/Box";

const rowContent = (props) => {
  const { row, open } = props;
  const handleClick = () => {};
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ maxHeight: "30vh", overflowY: "auto", overflowX: "hidden" }}>
          <Table size="small" sx={{ m: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Stuff</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.details.map((detailRow) => (
                <TableRow key={detailRow.Amout}>
                  <TableCell component="th" scope="row">
                    {detailRow.stuff}
                  </TableCell>
                  <TableCell>{detailRow.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ margin: 1, display: "flex", flexDirection: "row-reverse" }}>
          {row.status === "pending" ? (
            <Chip label="Cancel" variant="outlined" onClick={handleClick} />
          ) : (
            <></>
          )}
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default rowContent;
