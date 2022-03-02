import React from "react";
import styled from "styled-components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/ConfigureStore";

import Auth2RedirectHandler from "./Auth2RedirectHandler";
import Main from "../pages/Main";
import Login from "../pages/Login";
import WritePlan from "../pages/WritePlan";
import Navigation from "../components/Navigation";

function App() {
  return (
    <React.Fragment>
      <Fullscreen>
        <ConnectedRouter history={history}>
          <Container>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/writeplan" exact component={WritePlan} />

            <Route
              path="/oauth/callback/kakao"
              component={Auth2RedirectHandler}
            ></Route>
            <Navigation />
          </Container>
        </ConnectedRouter>
      </Fullscreen>
    </React.Fragment>
  );
}

const Fullscreen = styled.div`
  background-color: #e6f4fa;
  height: 100vh;
  padding-top: 100px;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 900px;
  width: 420px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

export default App;
