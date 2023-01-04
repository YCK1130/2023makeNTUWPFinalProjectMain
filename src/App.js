import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, BrowserRouter as Router } from "react-router-dom";

// Route
import { Redirect } from "react-router";
import PublicRoute from "./components/routes/publicRoute";
import PrivateRoute from "./components/routes/privateRoute";
import LoginRoute from "./components/routes/loginRoute";
import MainRoute from "./components/routes/mainRoute";
import UserRoute from "./components/routes/userRoute";
// containers
import Drawer from "./containers/drawer";
import Main from "./containers/main";
import Login from "./containers/login";
import UserProgress from "./containers/userProgress";
import UserStatus from "./containers/userStatus";
import TeamData from "./containers/teamData";
import AdminBoardList from "./containers/adminBoardList";
import RequestStatus from "./containers/requestStatus";

// compononets
import Loading from "./components/loading";
// initialize, slices
import { init, selectSession } from "./slices/sessionSlice";

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, []);
  const { initialized } = useSelector(selectSession);
  return !initialized ? (
    <Loading />
  ) : (
    <Switch>
      <MainRoute exact path="/">
        <Main />
      </MainRoute>
      <LoginRoute exact path="/login">
        <Login />
      </LoginRoute>
      <PrivateRoute exact path="/teamdata">
        <TeamData />
      </PrivateRoute>
      <PrivateRoute exact path="/boardlist">
        <AdminBoardList />
      </PrivateRoute>
      <UserRoute exact path="/user">
        <UserProgress />
      </UserRoute>
      <UserRoute exact path="/user/status">
        <UserStatus />
      </UserRoute>
      <PrivateRoute exact path="/requestStatus">
        <RequestStatus />
      </PrivateRoute>
      <Redirect to="/login" />
    </Switch>
  );
};

export default function App() {
  return (
    <div style={{ userSelect: "none" }}>
      <Router>
        <Drawer>
          <Routes />
        </Drawer>
      </Router>
    </div>
  );
}
