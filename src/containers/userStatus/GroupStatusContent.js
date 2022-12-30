import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";

import Box from "@mui/material/Box";

const GroupStatusContent = (props) => {
  const { row, open } = props;
  const handleClick = () => {};

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
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
            <Chip
              label="呼叫"
              variant="outlined"
              onClick={handleClick}
              sx={{ ml: 1 }}
            />
          ) : (
            <>
              <Chip
                label="取消"
                variant="outlined"
                onClick={handleClick}
                sx={{ ml: 1 }}
              />
              <Chip
                label="已領取"
                variant="outlined"
                onClick={handleClick}
                sx={{ ml: 1 }}
              />
            </>
          )}
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default GroupStatusContent;
