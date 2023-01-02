import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RowContent from "./UserRowContent";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMakeNTU } from "../../hooks/useMakeNTU";
var intervalId;
function Row(props) {
  const { row, userID } = props;
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const { deleteRequestFromUser } = useMakeNTU();

  //timer
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
      clearInterval(intervalId);
    }
  }, [timer]);

  const showTime = () => {
    if (
      row.status === "denied" ||
      row.status === "cancel" ||
      row.status === "outOfTime"
    ) {
      return "00 : 00";
    }
    var min = (timer % 60) / 10 < 1 ? "0" + (timer % 60) : timer % 60;
    return parseInt(timer / 60) + " : " + min;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxHeight: "10vh" }}>
        {row.status === "pending" ? (
          <TableCell align="left" sx={{ fontSize: 19 }}>
            申請中
          </TableCell>
        ) : row.status === "ready" ? (
          <TableCell align="left" sx={{ fontSize: 19 }}>
            請來拿
          </TableCell>
        ) : (
          <TableCell align="left" sx={{ fontSize: 19, color: "red" }}>
            {row.status === "denied"
              ? "已拒絕"
              : row.status === "cancel"
              ? "已取消"
              : "已超時 請重新申請"}
          </TableCell>
        )}

        <TableCell align="right" sx={{ fontSize: 20 }}>
          {showTime()}
        </TableCell>

        <TableCell align="right" sx={{ display: "flex" }}>
          {row.status !== "pending" && row.status !== "ready" ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => deleteRequestFromUser([userID, row._id])}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )}
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
        <RowContent row={row} open={open} userID={userID} />
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
