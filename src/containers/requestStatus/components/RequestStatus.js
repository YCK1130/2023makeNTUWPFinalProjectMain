import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GroupStatusContent from "./RequestStatusContent";
function GroupStatus(props) {
  //every request
  const { data, breakpoints } = props;
  // console.log(data);
  const [open, setOpen] = React.useState(false);
  // console.log(breakpoints);
  const statusTEXT = {
    pending: "申請中",
    solved: "已領取",
    ready: "呼叫中",
    denied: "已拒絕",
    cancel: "已取消",
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxHeight: "10vh" }}>
        <TableCell align={breakpoints.isXs ? "center" : "left"}>
          {data?.borrower?.teamName ?? "undefined"}
        </TableCell>
        {breakpoints.isPhone || breakpoints.isSm ? (
          <TableCell align="center">{"⏰"}</TableCell>
        ) : breakpoints.isXs ? (
          <></>
        ) : (
          <TableCell align="center">
            {data?.sendingTime ?? "undefined"}
          </TableCell>
        )}
        <TableCell align="center">
          {statusTEXT[data?.status] ?? "未知"}
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
      <TableRow>
        <GroupStatusContent data={data} open={open} />
      </TableRow>
    </React.Fragment>
  );
}
/*
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
*/
export default GroupStatus;
