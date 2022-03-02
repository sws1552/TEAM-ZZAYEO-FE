import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/ConfigureStore";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation"

import Main from "../pages/Main";
import WritePlan from "../pages/WritePlan";

function App() {

  return (
    <React.Fragment>
      <Fullscreen>
      <ConnectedRouter history={history}>
        <Container>
        <Route path="/" exact component={Main} />
        <Route path="/writeplan" exact component={WritePlan} />
        <Navigation/>
        </Container>
      </ConnectedRouter>
      </Fullscreen>
    </React.Fragment>
  );
}

const Fullscreen = styled.div`  
background-color:#e6f4fa;
height: 100vh;
padding-top: 100px;
`

const Container = styled.div`
background-color:white;
border-radius: 10px;
height: 900px;
width: 420px;
margin: auto;
box-sizing: border-box;
position: relative;
`

export default App;

