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
import CancelIcon from "@mui/icons-material/Cancel";
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

export default function ComplexGrid({
  handleDeleteCard,
  data,
  changedData,
  setChangedData,
}) {
  const [values, setValues] = useState({});
  useEffect(() => {
    setValues({ limit: data.limit, totalNum: data.totalNum });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    const existing = changedData.filter((item) => item.id === data.id);
    if (existing.length > 0) {
      setChangedData(
        changedData.map((item) => {
          if (item.id !== data.id) return item;
          return { ...data, [event.target.name]: event.target.value };
        })
      );
    } else {
      setChangedData([
        ...changedData,
        { ...data, [event.target.name]: event.target.value },
      ]);
    }
  };
  return (
    <Paper
      sx={{
        p: 2,
        margin: "5px",
        width: "20%",
        maxHeight: "330px",
        height: "auto",
        maxWidth: 230,
        minWidth: 150,
        flexGrow: 1,
        position: "relative",

        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
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
          >
            {data?.name || "Untitled"}
          </Typography>
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
            variant="standard"
            sx={{ width: "50%" }}
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
            variant="standard"
            sx={{ width: "50%" }}
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
        onClick={() => handleDeleteCard(data.id)}
      >
        <CancelIcon />
      </ButtonBase>
    </Paper>
  );
}