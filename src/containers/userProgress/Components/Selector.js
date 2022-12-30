import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';

export default function Selector(props) {
  const [q, setQ] = React.useState(0);

  useEffect(()=>{
  },[])
  if(props.defaultValue !== 0&&q===0){
    setQ(props.defaultValue);
  }

  const handleChange = (event) => {
    props.addNeedList(props.id, event.target.value);
    setQ(event.target.value);
  };

  const makeArray = (limit) => {
    //console.log(limit);
    let a = [];
    for(let i=0 ; i<limit+1 ; i++){
        a.push(i);
    }
    return a;
  };

  const a = makeArray(props.limit);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Quantity</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        key={props.id}
        value={q}
        label="quantity"
        onChange={handleChange}
        defaultValue={props.defaultValue||0}
      >
        {a.map((e) => {
            return <MenuItem key={props.id+"_"+ e} value={e}>{e}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}