import React, { forwardRef, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Typography,
  ButtonBase,
  Grid,
  TextField,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRef } from "react";
const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      //   thousandSeparator
      //   isNumericString
      //   prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
ComplexGrid.propTypes = {
  setAddCardData: PropTypes.func.isRequired,
};
export default function ComplexGrid({ setAddCardData }) {
  const [values, setValues] = useState({
    name: "Untitled",
    limit: 1,
    totalNum: 5,
  });
  // const nameInputRef = useRef(null);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.name === "name"
          ? event.target.value
          : parseInt(event.target.value),
    });
  };
  const handleKeyDown = (event) => {
    if (event.key !== "Enter") {
      // // console.log(event.key);
      return;
    }
    let { name, limit, totalNum } = values;
    if (name && limit && totalNum) {
      setAddCardData(values);
      if (event.target.name === "name") event.target.value = "";
      setValues({
        ...values,
        name: "",
      });
    } else {
      // console.log("something missing: ", name, limit, totalNum);
    }
  };
  // // console.log(values);
  return (
    <Paper
      sx={{
        p: 2,
        margin: "5px",
        width: "20%",
        height: "auto",
        maxHeight: "330px",
        maxWidth: 230,
        minWidth: 150,
        flexGrow: 1,
        position: "relative",

        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#424200" : "#fff",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <TextField
            id="input-name"
            label="Name"
            name="name"
            // value={values.name}
            // defaultValue={"Enter Board Name"}
            error={!values.name}
            helperText={!values.name ? "Required!" : ""}
            autoComplete="off"
            onChange={handleChange}
            onFocus={(event) => {
              if (!event.target.value) {
                setValues({
                  ...values,
                  name: "",
                });
              }
              event.target.select();
            }}
            onKeyDown={handleKeyDown}
            component="div"
            size="small"
            sx={{
              width: "100%",
              padding: "2px",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              borderWidth: "1rem",
              borderColor: "#1d1d1d",
              display: "flex",
              justifyContent: "center",
            }}
            // ref={nameInputRef}
          />
        </Grid>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="no img" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography gutterBottom variant="subtitle1" component="div">
            {"上限  :"}
          </Typography>
          <TextField
            id="formatted-numberformat-input_limit"
            label="limit"
            value={values.limit}
            onChange={handleChange}
            name="limit"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            onKeyDown={handleKeyDown}
            variant="standard"
            sx={{ width: "50%" }}
            autoComplete="off"
            error={!values.limit}
            helperText={!values.limit ? "Required!" : ""}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography gutterBottom variant="subtitle1" component="div">
            {"庫存  :"}
          </Typography>
          <TextField
            id="formatted-numberformat-input_totalNum"
            label="stock"
            value={values.totalNum}
            onChange={handleChange}
            name="totalNum"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            onKeyDown={handleKeyDown}
            variant="standard"
            sx={{ width: "50%" }}
            autoComplete="off"
            error={!values.totalNum}
            helperText={!values.totalNum ? "Required!" : ""}
          />
        </Grid>
      </Grid>
      <ButtonBase
        sx={{
          width: "30px",
          height: "30px",
          borderRadius: "20px",
          position: "absolute",
          right: 0,
          top: 0,
        }}
        onClick={() => {
          let { name, limit, totalNum } = values;
          if (name && limit && totalNum) {
            setAddCardData(values);
            // nameInputRef.current.value = "";
          } else {
            // console.log("something missing: ", name, limit, totalNum);
          }
        }}
      >
        <AddCircleIcon />
      </ButtonBase>
    </Paper>
  );
}
