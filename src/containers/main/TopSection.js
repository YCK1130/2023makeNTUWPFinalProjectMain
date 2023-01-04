import React from "react";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography } from "@mui/material/";
import { Link, useHistory } from "react-router-dom";
import { selectSession } from "../../slices/sessionSlice";
/**
 * This is Main Page
 */
export default function Top(props) {
  const history = useHistory();
  const { userID, authority } = props;
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      width: "100%",
      height: `calc(80vh - 64px)`,
      overflow: "auto",
    },
    paper: {
      // background: "rgb(0,0,0,.0)",
      boxShadow: "none",
    },
    text: {
      margin: "auto",
      textAlign: "start",
      width: "80%",
    },
    time: {
      margin: "auto",
      color: "#F5DE83",
      textAlign: "end",
      width: "70%",
      fontWeight: "400",
    },
  }));

  const classes = useStyles();
  const { isLogin } = useSelector(selectSession);
  return (
    <Element name="title">
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          style={{
            // boxShadow: "0 0 15px #f3d42e inset",
            padding: "10px",
            margin: "auto",
            marginTop: "5%",
            // marginLeft: "30%",
            width: "90%",
            maxWidth: "1000px",
            maxHeight: "500px",
          }}
        >
          {/* <Paper className={classes.paper}> */}
          <Grid item style={{ marginTop: "min(12.5%,20px)", marginLeft: "5%" }}>
            <Typography
              gutterBottom
              variant="h5"
              className={classes.text}
              style={{ opacity: ".5", textDecoration: "none" }}
            >
              MakeNTU
            </Typography>
            <Typography
              variant="h4"
              className={classes.text}
              style={{ marginBottom: "18px" }}
            >
              Competition Web
            </Typography>
            {isLogin && (
              <Typography
                variant="h4"
                className={classes.text}
                style={{ marginBottom: "18px" }}
              >
                {authority === 0
                  ? `Welcome Back Group#${userID}`
                  : `Welcome Back Administrator!`}
              </Typography>
            )}
          </Grid>
          {!isLogin && (
            <Button
              style={{
                width: "90%",
                maxWidth: "1000px",
                display: "flex",
                margin: "auto",
                marginTop: "5%",
                marginBottom: "3%",
                fontSize: "4vmin",
              }}
              variant="contained"
              color="primary"
              onClick={() => history.push("/login")}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Log in
              </Link>
            </Button>
          )}
          {/* <Button
              style={{
                width: "70%",
                display: "flex",
                margin: "auto",
              }}
              variant="contained"
              color="primary"
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/courses"
              >
                Start to Select Courses
              </Link>
            </Button> */}
          {/* </Paper> */}
        </Grid>
      </div>
    </Element>
  );
}
