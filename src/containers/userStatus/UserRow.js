import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RowContent from "./UserRowContent";
import { useEffect } from "react";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState("");
  useEffect(() => {
    var d = new Date().getTime(); //number
    setInterval(function () {}, 1000);
  }, []);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxHeight: "10vh" }}>
        <TableCell align="left">
          {row.status === "unsolved" ? "申請中" : "請來拿"}
        </TableCell>

        <TableCell align="right">{row.sendingTime}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ maxHeight: "30vh", overflowY: "scroll" }}>
        <RowContent row={row} open={open} />
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
