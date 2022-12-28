import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from './Cards';


const steps = ['挑選開發版', '確認送出', '資訊'];

const needList = new Map();

const board = [ //這裡會需要query
  {name:"Nano 33 IoT", tag:"Arduino", left:"2", v:true, ID:"1"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"5", v:true, ID:"2"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"1", v:true, ID:"3"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"5", v:true, ID:"4"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"2", v:true, ID:"5"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"0", v:true, ID:"6"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"5", v:true, ID:"7"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"1", v:true, ID:"8"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"3", v:true, ID:"9"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"5", v:true, ID:"10"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"2", v:true, ID:"11"},
  {name:"Nano 33 IoT", tag:"Arduino", left:"5", v:false, ID:"12"},
]

const Wrapper = styled.div`
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
  align-items: start;
  justify-content: start;
  overflow-y: scroll;
`;

function Body(){
  const [activeStep, setActiveStep] = React.useState(0);

  const addNeedList = (id, quantity) => {
    if(quantity===0){
      needList.delete(id,needList.get(id));
    }
    else{needList.set(id,quantity);}
    //console.log([...needList]);
  } 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    needList.clear();
    setActiveStep(0);
  };

  const order = () => {
    let a = [];
    for (var [key, value] of needList.entries()) {
      a.push('板子'+ key + '  ' + value + '個');
    }
    console.log(a);
    return a;
  }

  const showNeedList = order();

  

  return (
    <Box sx={{ width: '100%'}}>
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
      {activeStep === steps.length-1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          {showNeedList.map((e) => {
            return <Typography sx={{ mt: 2, mb: 1 }}>{e}</Typography>
          })}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <Wrapper>
          {board.map((e)=>{
            return <Card key={e.name+e.ID} name={e.name} tag={e.tag} left={e.left} limit={3} v={e.v} id={e.ID} needList={needList} addNeedList={addNeedList}/>
          })}
        </Wrapper>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
      </Box>
    </Box>
  );
}

export default Body;