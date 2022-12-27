import Header from './Header';
import Body from './Body';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

const Wrapper = styled.div`
  margin: auto;
  width: 80%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

function App() {
  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        {/* <Header /> */}
        <Body />
      </StyledPaper>
    </Wrapper>
  );
}

export default App;
