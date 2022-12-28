import React from "react";
import styled from "styled-components";
import { useState } from "react";
import SearchBar from "../../components/searchBar";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;
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
    </HeaderContainer>
  );
}
