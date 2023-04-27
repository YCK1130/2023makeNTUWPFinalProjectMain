import React, { useEffect, useState } from "react";
import StatusConsole from "./StatusConsole";
import RequestConsole from "./RequestConsole";
import styled from "styled-components";
import { useMakeNTU } from "../../hooks/useMakeNTU";
import { useSelector } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from "@mui/material";

const ConsoleWrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 45%;
  height: 100%;
`;
export default function RequestPage() {
  const { breakpoints, subscribe, setNowPage, updateReq } = useMakeNTU();
  const { teamID, authority } = useSelector(selectSession);
  const [warningOpen, setWarningOpen] = useState(false);
  const [denyID, setDenyID] = useState("");
  useEffect(() => {
    setNowPage({ id: teamID, authority: authority, page: "requestStatus" });
    subscribe({ id: teamID, authority: authority, page: "requestStatus" });
  }, []);
  const handleCloseWarning = () => {
    setWarningOpen(false);
  };
  const handleOpenWarning = () => {
    setWarningOpen(true);
  };
  const handleDeny = () => {
    updateReq({ requestID: denyID._id, requestStatus: "denied" });
    setWarningOpen(false);
  };
  return (
    <ConsoleWrapper>
      <Dialog
        aria-labelledby="simple-dialog-title"
        // disableBackdropClick
        open={warningOpen}
        onClose={handleCloseWarning}
      >
        <DialogTitle id="simple-dialog-title">Deny?</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: "15vw", minHeight: "10vh" }}>
            {`You are denying Reqeust ID: ${denyID.requestID}`}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarning} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeny} variant="contained" color="primary">
            {"Continue"}
          </Button>
        </DialogActions>
      </Dialog>
      <RequestConsole
        breakpoints={breakpoints}
        handleOpenWarning={handleOpenWarning}
        setDenyID={setDenyID}
      />
      {breakpoints.isSm || breakpoints.isXs ? (
        <></>
      ) : (
        <Wrapper>
          <StatusConsole breakpoints={breakpoints} />
        </Wrapper>
      )}
    </ConsoleWrapper>
  );
}
