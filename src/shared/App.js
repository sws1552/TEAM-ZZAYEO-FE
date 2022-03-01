import React from "react";
import Main from "../pages/Main";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/ConfigureStore";
import styled from "styled-components";
import Navigation from "../components/Navigation"

function App() {

  return (
    <React.Fragment>
      <Fullscreen>
      <ConnectedRouter history={history}>
        <Container>
        <Route path="/" exact component={Main} />
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
position: relative;
`

export default App;

