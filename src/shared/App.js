import React from "react";
import styled from "styled-components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/ConfigureStore";

import Auth2RedirectHandler from "./Auth2RedirectHandler";
import Main from "../pages/Main";
import Login from "../pages/Login";
import WritePlan from "../pages/WritePlan";
import Navigation from "../components/Navigation/Navigation";
import ChatList from "../pages/ChatList";
import AddPlan from "../pages/AddPlan";

function App() {
  return (
    <React.Fragment>
      <Fullscreen>
        <ConnectedRouter history={history}>
          <Container>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/addplan" exact component={AddPlan} />
            <Route path="/writeplan" exact component={WritePlan} />

            <Route
              path="/oauth/callback/kakao"
              exact
              component={Auth2RedirectHandler}
            ></Route>
            <Route path="/naver" exact component={Auth2RedirectHandler} />

            <Route path="/chatlist" exact component={ChatList} />
          </Container>
          <Navigation />
        </ConnectedRouter>
      </Fullscreen>
    </React.Fragment>
  );
}

const Fullscreen = styled.div`
  background-color: #e6f4fa;
  /* height: 100vh; */
`;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 100vh;
  width: 420px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

export default App;
