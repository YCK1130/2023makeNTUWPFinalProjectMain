import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RowContent from "./UserRowContent";
import { useEffect, useRef } from "react";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const intervalRef = useRef();

  //timer
  var intervalId;
  useEffect(() => {
    var d = new Date().getTime(); //number
    var pretime = parseInt(15 * 60 - (d - row.sendingTime) / 1000, 10);
    setTimer(pretime);
    intervalId = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    console.log("break!");
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer < 0) {
      console.log("out of time");
      clearInterval(intervalId);
    }
  }, [timer]);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxHeight: "10vh" }}>
        <TableCell align="left" sx={{ fontSize: 19 }}>
          {row.status === "unsolved" ? "申請中" : "請來拿"}
        </TableCell>

        <TableCell align="right" sx={{ fontSize: 20 }}>
          {parseInt(timer / 60)} : {timer % 60}
        </TableCell>
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
