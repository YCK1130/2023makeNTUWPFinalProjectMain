import Header from "./Header";
import Body from "./Body";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import "antd/dist/antd.css";

const Wrapper = styled.div`
  margin: auto;
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
  height: 90vh;
`;

function App() {
  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header />
        <Body />
      </StyledPaper>
    </Wrapper>
  );
}

export default App;
