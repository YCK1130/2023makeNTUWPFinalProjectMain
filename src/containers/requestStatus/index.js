import React from "react";
import StatusConsole from "./StatusConsole";
import RequestConsole from "./RequestConsole";
import { useState } from "react";
import styled from "styled-components";
import { useMakeNTU } from "../../hooks/useMakeNTU";

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
export default function BoardPage() {
  const [searchKeyWord, setKeyWord] = useState("");
  const { breakpoints } = useMakeNTU();

  return (
    <ConsoleWrapper>
      <RequestConsole breakpoints={breakpoints} />
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
