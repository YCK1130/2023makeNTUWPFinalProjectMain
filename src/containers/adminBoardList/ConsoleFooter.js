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
ConsoleFooter.propTypes = {
  setKeyWord: PropTypes.func.isRequired,
};
export default function ConsoleFooter({ setKeyWord }) {
  return (
    <FooterContainer>
      <SearchBar handleChange={setKeyWord} />
    </FooterContainer>
  );
}
