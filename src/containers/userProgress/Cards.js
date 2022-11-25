import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import Selector from './Components/Selector';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



export default function Card(props) {

  //console.log(props.addNeedList);
  return (
    <Paper
      sx={{
        width: 1/5 ,
        p: 2,
        margin: '5px',
        flexGrow: 3,
        visibility: (!props.v ? 'hidden':'visible'),
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="nano33" src="/photoData/nano33.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.tag}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Selector id={props.id} limit={Math.min(props.limit,props.left)} addNeedList={props.addNeedList}/>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              left:{props.left}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}