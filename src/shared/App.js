import React from "react";
import styled from "styled-components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/ConfigureStore";

import Auth2RedirectHandler from "./Auth2RedirectHandler";
import Main from "../pages/Main";
import Login from "../pages/Login";
import WritePlan from "../pages/WritePlan";
import ChatList from "../pages/ChatList";
import AddPlan from "../pages/AddPlan";
import ChatRoom from "../pages/ChatRoom";
import MainDetailPage from "../pages/MainDetailPage";

import MyPage from "../pages/MyPage";
import MypageProUp from "../pages/MypageProUp";
import MypageSetting from "../pages/MypageSetting";
import Myplan from "../pages/Myplan";
import EditPlan from "../pages/EditPlan";
import Search from "../pages/Search";
import OtherUserPage from "../pages/OtherUserPage";
import BottomNav from "../components/Navigation/BottomNav";


function App() {
  return (
    <React.Fragment>
      <Fullscreen>
        <ConnectedRouter history={history}>
          <Container>
            <Route path="/" exact component={Main} />
            <Route path="/detail/:planId" exact component={MainDetailPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/myplan" exact component={Myplan} />
            <Route path="/addplan" exact component={AddPlan} />
            <Route path="/editplan" exact component={EditPlan} />
            <Route path="/writeplan/:planId" exact component={WritePlan} />
            <Route path="/search" exact component={Search}></Route>
            <Route
              path="/api/auth/kakao/callback"
              exact
              component={Auth2RedirectHandler}
            ></Route>
            {/* <Route path="/naver" exact component={Auth2RedirectHandler} /> */}

            <Route path="/chatlist" exact component={ChatList} />
            <Route path="/chatroom" exact component={ChatRoom} />

            <Route path="/mypage" exact component={MyPage} />
            <Route path="/mypageproup" exact component={MypageProUp} />
            <Route path="/mypageset" exact component={MypageSetting} />
            <Route path="/otheruser/:userId" exact component={OtherUserPage} />
           <BottomNav/>
          </Container>
        </ConnectedRouter>
      </Fullscreen>
    </React.Fragment>
  );
}

const Fullscreen = styled.div`
  background-color: #e6f4fa;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  height: 100%;
  width: 420px;
  box-sizing: border-box;
  position: relative;
  bottom: 0;
`;

export default App;
