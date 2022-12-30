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
import BoardRequestContentElement from "./BoardRequestContentElement";
import { v4 as uuidv4 } from "uuid";
function BoardRequestContent(props) {
  const { row, open } = props;
  let [numReturn, setNumReturn] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const handleClick = () => {};
  /*
  var editStuff = [];
  row.details.map((detail) => {
    editStuff.push({
      stuff: detail.stuff,
      numReturn: 0,
      numMax: detail.amount,
    });
  });
  const [editt, setEditt] = React.useState(editStuff);
*/
  const changeReturn = (stuff, num, index, add) => {
    let a = JSON.parse(JSON.stringify(numReturn));
    //var Ix = editStuff.findIndex((x) => x.stuff === stuff);
    if (add) {
      if (a[index] + num >= row.details[index].amount) {
        a[index] = row.details[index].amount;
        setNumReturn(a);
        return;
      }
      if (a[index] + num <= 0) {
        a[index] = 0;
        setNumReturn(a);
        return;
      }
      a[index] = a[index] + num;
      setNumReturn(a);
      /*editStuff = editt;
      editStuff[Ix].numReturn = editStuff[Ix].numReturn + num;
      setEditt(editStuff);
      console.log(editt);
    */
    } else {
      let number = parseInt(num);
      if (num === "" || number <= 0) {
        a[index] = 0;
        setNumReturn(a);
        return;
      } else if (number > row.details[index].amount) {
        a[index] = row.details[index].amount;
        setNumReturn(a);
        return;
      }
      a[index] = parseInt(num);
      setNumReturn(a);
      /*editStuff[Ix].numReturn = num;
      setEditt(editStuff);
    */
    }
  };
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open}>
        <Table size="small" sx={{ m: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Stuff</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Return</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              {row.details.map((detailRow, index) => (
                <BoardRequestContentElement
                  key={uuidv4()}
                  changeReturn={changeReturn}
                  detailRow={detailRow}
                  numReturn={numReturn}
                  index={index}
                />
              ))}
            </React.Fragment>
          </TableBody>
        </Table>

        <Box sx={{ margin: 1, display: "flex", flexDirection: "row-reverse" }}>
          <Chip
            label="Edit"
            variant="outlined"
            onClick={handleClick}
            sx={{ fontSize: 17 }}
          />
        </Box>
      </Collapse>
    </TableCell>
  );
}

export default BoardRequestContent;
