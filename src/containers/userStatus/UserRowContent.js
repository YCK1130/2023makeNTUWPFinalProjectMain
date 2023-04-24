import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import AlertWindow from "./AlertWindow";
import { useMakeNTU } from "../../hooks/useMakeNTU";

const RowContent = (props) => {
  const { row, open, teamID, state } = props;
  const [alertOpen, setAlertOpen] = React.useState(false);
  const { cancelRequest, breakpoints, updateReq, deleteRequestFromUser } =
    useMakeNTU();
  const handleCancel = () => {
    setAlertOpen(true);
  };
  const handleConfirm = () => {
    if (!row?._id) {
      // console.log("missing requestID: ", data?._id);
      return;
    }
    updateReq({ requestID: row?._id, requestStatus: "solved" });
    deleteRequestFromUser([teamID, row?._id]);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleAlertAgree = () => {
    cancelRequest([teamID, row._id]);
    setAlertOpen(false);
  };

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ maxHeight: "30vh", overflowY: "auto", overflowX: "hidden" }}>
          <Table size="small" sx={{ m: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                //breakpoints.is
              }

              {state
                ? row.map((detailRow) => {
                    // console.log(detailRow);
                    return (
                      <TableRow key={detailRow.id.slice(0, 8)}>
                        <TableCell component="th" scope="row">
                          {detailRow.name}
                        </TableCell>
                        <TableCell>{detailRow.num}</TableCell>
                      </TableRow>
                    );
                  })
                : row.requestBody.map((detailRow) => (
                    <TableRow key={detailRow._id}>
                      <TableCell component="th" scope="row">
                        {detailRow.board}
                      </TableCell>
                      <TableCell>{detailRow.quantity}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ margin: 1, display: "flex", flexDirection: "row-reverse" }}>
          {state ? (
            <></>
          ) : row.status === "pending" ? (
            <Chip label="Cancel" variant="outlined" onClick={handleCancel} />
          ) : row.status === "waiting" ? (
            <>
              <Chip
                label="Confirm"
                variant="outlined"
                onClick={handleConfirm}
              />
              <Chip label="Cancel" variant="outlined" onClick={handleCancel} />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Collapse>
      <AlertWindow
        open={alertOpen}
        handleAlertClose={handleAlertClose}
        handleAlertAgree={handleAlertAgree}
      />
    </TableCell>
  );
};

export default RowContent;
