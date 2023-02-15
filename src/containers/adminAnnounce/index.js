import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
} from "@mui/material/";
import { Redirect } from "react-router";
import { selectSession } from "../../slices/sessionSlice";
import { useMakeNTU } from "../../hooks/useMakeNTU";

const Announcement = ({ children }) => {
  const { authority } = useSelector(selectSession);
  const dispatch = useDispatch();
  const { adminAnnounceOpen, setAdminAnnounceOpen, announcementMSG } =
    useMakeNTU();

  const handleAdminAnnounceClose = () => {
    setAdminAnnounceOpen(false);
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={authority !== 1 && adminAnnounceOpen}
      onClose={handleAdminAnnounceClose}
    >
      <DialogTitle id="simple-dialog-title">管理員通知</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "15vw", minHeight: "10vh" }}>
          {announcementMSG.map((msg) => (
            <Typography>{msg}</Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdminAnnounceClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Announcement;
