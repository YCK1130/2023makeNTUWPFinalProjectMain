import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useRef } from "react";
function BoardRequestContentElement(props) {
  const { card, changeReturn, numReturn, index } = props;
  const [keyin, setKeyin] = React.useState(-1);

  return (
    <TableRow key={card.stuff}>
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
            console.log(keyin);
            setKeyin(-1);
            changeReturn(card.board, -1, index, true);
            console.log(index, card.board);
            //console.log(editt[index].numReturn.toString(), "ddd");
          }}
        />
        <TextField
          id="outlined-name"
          //onChange={handleChange}
          value={keyin === -1 ? numReturn[index] : keyin} //"jo" //{editt[index].numReturn.toString() + "ddd"}
          size="small"
          variant="standard"
          sx={{ width: "6vh", mt: 1 }}
          onChange={(e) => {
            console.log(keyin);
            setKeyin(e.target.value);
            changeReturn(card.board, e.target.value, index, false);
          }}
        />

        <Chip
          size="small"
          label="+"
          variant="outlined"
          onClick={() => {
            console.log(keyin);
            setKeyin(-1);
            changeReturn(card.board, 1, index, true);
          }}
          sx={{ m: 1 }}
        />
      </TableCell>
    </TableRow>
  );
}
export default BoardRequestContentElement;
