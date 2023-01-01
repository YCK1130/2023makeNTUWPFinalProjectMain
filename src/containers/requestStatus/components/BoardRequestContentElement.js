import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect } from "react";
function BoardRequestContentElement(props) {
  const { card, changeReturn, numReturn } = props;
  // const [num, setNum] = React.useState(0);
  useEffect(() => {
    changeReturn(card.board, 0, true);
  }, []);
  return (
    <TableRow key={card}>
      <TableCell component="th" scope="row">
        {card.board}
      </TableCell>
      <TableCell>{card.quantity} 個</TableCell>
      <TableCell>
        <Chip
          size="small"
          sx={{ fontSize: 20, m: 1 }}
          label="-"
          variant="outlined"
          onClick={() => {
            let newNum = parseInt(numReturn[card.board] - 1);
            let valid = newNum <= card.quantity && newNum >= 0;
            changeReturn(card.board, numReturn[card.board] - 1, valid);
          }}
        />
        <TextField
          id="outlined-name"
          value={numReturn[card.board]}
          size="small"
          variant="standard"
          sx={{ width: "6vh", mt: 1 }}
          onChange={(e) => {
            // setNum(e.target.value);
            let newNum = parseInt(e.target.value);
            let valid = newNum <= card.quantity && newNum >= 0;
            changeReturn(card.board, e.target.value, valid || !e.target.value);
          }}
        />

        <Chip
          size="small"
          label="+"
          variant="outlined"
          onClick={() => {
            let newNum = parseInt(numReturn[card.board] + 1);
            let valid = newNum <= card.quantity && newNum >= 0;
            changeReturn(card.board, numReturn[card.board] + 1, valid);
          }}
          sx={{ m: 1 }}
        />
      </TableCell>
    </TableRow>
  );
}
export default BoardRequestContentElement;
