import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SearchBar from "./Components/SearchBar";

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;

const handleExit = async () => {
  window.close();
  //console.log("Exit借用板塊")
};
export default function Header({ setKeyWord }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    console.log(searchWord);
    setKeyWord(searchWord);
    // setSearchWord(e.target.value);
  };
  return (
    <HeaderContainer>
      <SearchBar handleSearch={handleSearch} handleChage={setSearchWord} />
      {/* <Button variant="contained" onClick={handleExit}>Exit</Button> */}
    </HeaderContainer>
  );
}
