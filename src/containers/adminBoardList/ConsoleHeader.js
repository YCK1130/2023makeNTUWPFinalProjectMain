import React from "react";
import styled from "styled-components";
import { useState } from "react";
import SearchBar from "../../components/searchBar";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
} from "@mui/material";

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;
export default function Header({ setSaving, ableSave }) {
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const handleCloseImport = () => {
    setImportOpen(false);
  };
  const handleImport = () => {
    handleCloseImport();
  };
  const handleOpenImport = () => {
    setImportOpen(true);
  };

  const handleCloseExport = () => {
    setExportOpen(false);
  };
  const handleExport = () => {
    handleCloseExport();
  };
  const handleOpenExport = () => {
    setExportOpen(true);
  };

  const handleSave = () => {
    setSaving(true);
  };
  return (
    <HeaderContainer>
      <ButtonContainer>
        <Dialog
          aria-labelledby="simple-dialog-title"
          // disableBackdropClick
          open={importOpen}
          onClose={handleCloseImport}
          // sx={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <DialogTitle id="simple-dialog-title">Importing Data</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: "15vw", minHeight: "10vh" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImport}>Cancel</Button>
            <Button onClick={handleImport} variant="contained" color="primary">
              {"Import"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          aria-labelledby="simple-dialog-title"
          // disableBackdropClick
          open={exportOpen}
          onClose={handleCloseExport}
          // sx={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <DialogTitle id="simple-dialog-title">Exporting Data</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: "15vw", minHeight: "10vh" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExport}>Cancel</Button>
            <Button onClick={handleExport} variant="contained" color="primary">
              {"Export"}
            </Button>
          </DialogActions>
        </Dialog>
        <Grid
          container
          spacing={1}
          // justify="center"
          justifyContent="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item sm={5}>
            <Grid
              container
              spacing={1}
              justify="flex-start"
              alignItems="flex-start"
              direction="row"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenImport}
                >
                  Import
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenExport}
                >
                  Export
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!ableSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </ButtonContainer>
    </HeaderContainer>
  );
}
