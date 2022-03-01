import React from "react";
import Main from "../pages/Main";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/ConfigureStore";



function App() {

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
