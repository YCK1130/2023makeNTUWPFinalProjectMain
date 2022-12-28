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
export default function Header({ setKeyWord }) {
  const [searchWord, setSearchWord] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const handleSearch = () => {
    console.log(searchWord);
    setKeyWord(searchWord);
    // setSearchWord(e.target.value);
  };
  const handleCloseAdd = () => {
    setAddOpen(false);
  };
  const handleAddStudent = () => {
    handleCloseAdd();
  };
  const handleOpenAdd = () => {
    setAddOpen(true);
  };
  return (
    <HeaderContainer>
      <ButtonContainer>
        <Dialog
          aria-labelledby="simple-dialog-title"
          // disableBackdropClick
          open={addOpen}
          onClose={handleCloseAdd}
          // sx={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <DialogTitle id="simple-dialog-title">
            Importing/Exporting Data
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button
              onClick={handleAddStudent}
              variant="contained"
              color="primary"
            >
              {"Add"}
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
          <Grid item sm={4}>
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
                  onClick={handleOpenAdd}
                >
                  Import
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenAdd}
                >
                  Export
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpenAdd}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </ButtonContainer>
    </HeaderContainer>
  );
}
