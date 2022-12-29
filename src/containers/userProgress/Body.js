import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


import SearchBar from "./Components/SearchBar";
import Card from "./Cards";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";
import { useMakeNTU } from "../hooks/useMakeNTU";

const steps = ["挑選開發版", "確認並送出", "申請結果"];

const needList = new Map();

const board = [
  //這裡會需要query
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "1" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "2" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "3" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "4" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "5" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "0", v: true, ID: "6" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "7" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "8" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "3", v: true, ID: "9" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "10" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "11" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "13" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "14" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "15" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "16" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "17" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "0", v: true, ID: "18" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "19" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "1", v: true, ID: "20" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "3", v: true, ID: "21" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: true, ID: "22" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "2", v: true, ID: "23" },
  { name: "Nano 33 IoT", tag: "Arduino", left: "5", v: false, ID: "24" },
];

const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  //overflow-y: scroll;
`;


function Body() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [rerender, setRerender] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState("");

  const { sendData } = useMakeNTU();
  const { userID } = useSelector(selectSession);


  const handleSearch = () => {
    //console.log(searchWord);
    //setKeyWord(searchWord);
    //sendMessage(searchWord);
    // setSearchWord(e.target.value);
  };
  
  const addNeedList = (id, quantity) => {
    if (quantity === 0) {
      needList.delete(id, needList.get(id));
    } else {
      needList.set(id, quantity);
    }
    //console.log([...needList]);
  };
  
  const handleNext = () => {
    if(activeStep === steps.length - 1){
      setActiveStep(0);
      needList.clear();
      return;
    }
    else if(activeStep === steps.length - 2){
      let requestBody = [];
      let group = userID;

      for (var [key, value] of needList.entries()) {
        requestBody.push([key, value]);
      }

      sendData(["REQUEST", {group, requestBody}]);
    }
    
    console.log("User "+userID);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    needList.clear();
    setActiveStep(0);
    setRerender(true);
  };
  
  const order = () => {
    let a = [];
    for (var [key, value] of needList.entries()) {
      a.push("板子ID:" + key + "  申請" + value + "個");
    }
    //console.log(a);

    if(a.length === 0){
      a.push("Warning!!!!!  Something wrong!!!!!")
    }
    return a;
  };
  
  const showNeedList = order();
  
  const renderCard = () => {
    let newBoard = board.map((e) => {
      if (activeStep === steps.length - 2) {
        if (needList.has(e.ID)) {
          return (
            <Card
              key={e.name + e.ID}
              name={e.name}
              tag={e.tag}
              left={e.left}
              limit={3}
              v={e.v}
              id={e.ID}
              needList={needList}
              addNeedList={addNeedList}
            />
          );
        }
      } else {
        return (
          <Card
            key={e.name + e.ID}
            name={e.name}
            tag={e.tag}
            left={e.left}
            limit={3}
            v={e.v}
            id={e.ID}
            needList={needList}
            addNeedList={addNeedList}
            rerender={rerender}
          />
        );
      }
    })

    return newBoard
  }

  useEffect(() => {
    setRerender(false);
  },[rerender])

  return (
    <Box sx={{ width: "100%" }}>
      <Box mb={2}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length - 1 ? (
        <Wrapper>
          {/* <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
              <br></br>
              What have you order:
              <br></br>
            </Typography>
            <br></br>
            {showNeedList.map((e) => {
              return <Typography sx={{ mt: 2, mb: 1 }}>{"     " + e}<br /></Typography>
            })}
          </React.Fragment> */}
          <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                All steps completed (you&apos;re finished)
                <br></br>
                This is your order list:
              </Typography>
              <List dense={false}>
                {showNeedList.map((e) => {
                  return <ListItem><ListItemText primary={e}/></ListItem>
                })}
              </List>
            </Grid>
          </Box>
        </Wrapper>
      ) : (
        <Wrapper>
          <Box
            sx={{
              width: "80%",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.6)",
              overflowY: "scroll",
              borderRadius: "5px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {renderCard()}
          </Box>
        </Wrapper>
      )}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 , justifyContent:"space-evenly"}}>
        <Button disabled={activeStep === 0||activeStep === steps.length - 1} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        
        {activeStep === 0 ? (
          <SearchBar handleSearch={handleSearch} handleChage={setSearchWord}></SearchBar>
        ) : <SearchBar visibility={"hidden"} handleSearch={handleSearch} handleChage={setSearchWord}></SearchBar>}

        <Box sx={{maxWidth:"15%"}}>
          {activeStep !== steps.length - 1 ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : null}

          <Button onClick={handleNext}>
            {activeStep === steps.length - 2 ? 
              "Confirm" : activeStep === steps.length - 1 ?
              "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Body;
