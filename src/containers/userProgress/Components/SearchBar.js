import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import PropTypes from "prop-types";

function SearchBar({ handleChage }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "75%",
        borderRadius: "10px",
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={(e) => {
          //   console.log(e.target.value);
          handleChage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
            e.preventDefault();
          }
        }}
        // inputProps={{ "aria-label": "search google maps" }}
      />

      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
SearchBar.propTypes = {
  handleChage: PropTypes.func.isRequired,
};
export default SearchBar;
