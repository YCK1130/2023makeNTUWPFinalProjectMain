import React from "react";
import styled from "styled-components";
import { useState } from "react";
import SearchBar from "../../components/searchBar";
import PropTypes from "prop-types";

const FooterContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;
Footer.propTypes = {
  setKeyWord: PropTypes.func.isRequired,
};
export default function Footer({ setKeyWord }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    console.log(searchWord);
    setKeyWord(searchWord);
    // setSearchWord(e.target.value);
  };
  return (
    <FooterContainer>
      <SearchBar handleSearch={handleSearch} handleChage={setSearchWord} />
    </FooterContainer>
  );
}
