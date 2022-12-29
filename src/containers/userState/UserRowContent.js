import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const rowContent = (props) => {
  const { row, state } = props;
  return (
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
  );
};

export default rowContent;
