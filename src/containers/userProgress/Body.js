import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import SearchBar from "./Components/SearchBar";
import Card from "./Cards";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSession } from "../../slices/sessionSlice";
import { useMakeNTU } from "../../hooks/useMakeNTU";

const steps = ["挑選開發版", "確認並送出", "申請結果"];

var needList = {};

const Wrapper = styled.div`
  width: 100%;
  height: 74vh;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  //overflow-y: hidden;
`;

function Body() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [rerender, setRerender] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState("");
  const [searchMethod, setSearchMethod] = React.useState("Name");
  //const [needList, setNeedList] = React.useState({});
  const [userCardData,setUserCardData]=React.useState([]) 
  const { userBoardINIT, sendData, getUser, cardData, userRequest, userCards, subscribe} = useMakeNTU();
  const { userID } = useSelector(selectSession);
  
  useEffect(() => {
    getUser(userID);
    subscribe("userProgress");
    needList={}
  }, []);
  useEffect(()=>{

    setUserCardData(cardData.map((e)=>{
      e.needList=needList
      return e;
    }));
    setRerender(false);

  },[needList,cardData,rerender])

  useEffect(() => {
    needList = {};
  }, [userID]);

  const handleCheck = (m) => {
    setSearchMethod(m);
  };

  const addNeedList = (name, quantity) => {
    if (quantity === 0) {
      delete needList[name];
    } else {
      needList[name] = quantity;
      console.log(needList);
    }
    //console.log([...needList]);
  };

  const handleNext = () => {
    console.log(userRequest,userCards);
    if (activeStep === steps.length - 1) {
      handleReset();
      return;
    } else if (activeStep === steps.length - 2) {
      let requestBody = [];
      let group = userID;

      // for (var [key, value] of needList.entries()) {
      //   requestBody.push([key, value]);
      // }
      Object.keys(needList).forEach(function(key) {
        requestBody.push([key, needList[key]]);
      });
      // console.log({ group, requestBody });
      sendData(["REQUEST", { group, requestBody }]);
    }

    console.log("User " + userID);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    needList = {};
    setUserCardData([]);
    setActiveStep(0);
    setRerender(true);
  };

  const order = () => {
    let a = [];
    // for (var [key, value] of needList.entries()) {
    //   a.push("板子 : " + key + "  申請" + value + "個");
    // }
    Object.keys(needList).forEach(function(key) {
      a.push("板子 : " + key + "  申請" + needList[key] + "個");
    });
    //console.log(a);

    if (a.length === 0) {
      a.push("Warning!!!!!  Something wrong!!!!!");
    }
    return a;
  };

  const showNeedList = order();

  const renderCard = () => {
    // let newBoard = ;

    // return newBoard;
  };

  useEffect(() => {
    setRerender(false);
  }, [rerender]);

  useEffect(() => {
    let payload = 0;
    userBoardINIT(payload);
  }, [rerender]);
  console.log(cardData)
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
          <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                All steps completed (you&apos;re finished)
                <br></br>
                This is your order list:
              </Typography>
              <List dense={false}>
                {showNeedList.map((e) => {
                  return (
                    <ListItem key={e}>
                      <ListItemText primary={e} />
                    </ListItem>
                  );
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
              alignContent: "start",
            }}
          >
            {userCardData.length!==0?userCardData.map((e) => {
              console.log("hi")
      if (activeStep === steps.length - 2) {
        if (needList[e.name]) {
          return (
            <Card
              key={`${e.name} + ${e.id} +${userID}`}
              name={e.name}
              tag={e.category}
              left={e.remain}
              limit={e.limit}
              v={true}
              id={e.id}
              userID={userID}
              needList={e.needList}
              addNeedList={addNeedList}
            />
          );
        }
      } else {
        //這裡要filter

        if (
          (searchMethod === "Name" && e.name.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) ||
          (searchMethod === "Tag" && e.category.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1)
        ) {
          return (
            <Card
              key={e.name + e.id}
              name={e.name}
              tag={e.category}
              left={e.remain}
              limit={e.limit}
              v={true}
              id={e.id}
              needList={e.needList}
              addNeedList={addNeedList}
              rerender={rerender}
            />
          );
        }
      }
    }):<></>}
          </Box>
        </Wrapper>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "space-evenly",
        }}
      >
        <Button
          disabled={activeStep === 0 || activeStep === steps.length - 1}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>

        {activeStep === 0 ? (
          <SearchBar
            handleCheck={setSearchMethod}
            handleChange={setSearchWord}
            searchMethod={searchMethod}
          />
        ) : (
          <SearchBar
            visibility={"hidden"}
            handleCheck={setSearchMethod}
            handleChange={setSearchWord}
            searchMethod={searchMethod}
          />
        )}

        <Box sx={{ maxWidth: "15%" }}>
          {activeStep !== steps.length - 1 ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : null}

          <Button onClick={handleNext} disabled = { (needList.length === 0) }>
            {activeStep === steps.length - 2
              ? "Confirm"
              : activeStep === steps.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Body;
