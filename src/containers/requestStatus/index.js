import React from "react";
import StatusConsole from "./StatusConsole";
import RequestConsole from "./RequestConsole";
import { useState } from "react";
import styled from "styled-components";

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
export default function BoardPage() {
  const [searchKeyWord, setKeyWord] = useState("");
  return (
    <ConsoleWrapper>
      <RequestConsole />
      <StatusConsole keyWord={searchKeyWord} />
    </ConsoleWrapper>
  );
}
