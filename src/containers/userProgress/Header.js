import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 1em;
  }
`;

const Header = () => {

const handleExit = async () => {
    window.close()
    //console.log("Exit借用板塊")
};


  return (
    <Wrapper>
      <Typography variant="h2">MakeNTU 開發版借用</Typography>
      <Button variant="contained" onClick={handleExit}>
        Exit
      </Button>
    </Wrapper>
  );
};

export default Header;
