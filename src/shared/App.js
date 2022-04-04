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
import AllPlanPage from "../pages/AllPlanPage";
import StartPage from "../pages/StartPage";

import NoticePage from "../pages/NoticePage";

import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import HeaderBar from "../components/Main/HeaderBar";
import ScreenBackground from "../components/ScreenBackground/ScreenBackground";
import "./App.css" 
function App() {
  // 브라우저에서 알림 허용 차단 창
  // const isNotificationSupported = "Notification" in window;
  // if (isNotificationSupported) {
  //   Notification.requestPermission().then(function (result) {
  //     if (result === "granted") {
  //       console.log("[Notification] 허용: ", result);
  //     } else {
  //       console.log("[Notification] 차단:d ", result);
  //     }
  //   });
  // }


  Notification.requestPermission().then((status) => {
    console.log('Notification 상태', status);
  
    if (status === 'denied') {
      alert('Notification 거부됨');
    } else if (navigator.serviceWorker) {

      navigator.serviceWorker
        .register('/pwabuilder-sw.js') // serviceworker 등록
        .then(function (registration) {
          console.log('Service Worker is registered', registration)
          const subscribeOptions = {
            userVisibleOnly: true,
            // push subscription이 유저에게 항상 보이는지 여부. 알림을 숨기는 등 작업이 들어가지는에 대한 여부인데, 크롬에서는 true 밖에 지원안한다.
            // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user
            applicationServerKey: "BAefk2TWsnXitJqLiDIQVaNPVfx7gttnHWu8AXZlqHUx5cQiX-12XzAmM4TScMlP3TZPs5wfkTdY-MrI4nvkwQU", // 발급받은 vapid public key
          };
  
          return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function (pushSubscription) {
          // subscription 정보를 저장할 서버로 보낸다.
          console.log('pushSubscription !! ',pushSubscription)
          // postSubscription(pushSubscription);
        });
    }
  });


  const dispatch = useDispatch();

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(chatActions.createSocketInstance());
    } else {
      return;
    }

    return () => {
      dispatch(chatActions.destroySocketInstance());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <Fullscreen>
        <ScreenBackground />
        <ConnectedRouter history={history}>
          <Container>
            <Route path="/" exact component={Main} />
            <Route path="/main" exact component={StartPage} />
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
            <Route path="/allplan" exact component={AllPlanPage} />
            <Route path="/noticepage" exact component={NoticePage} />
            <BottomNav />
          </Container>
        </ConnectedRouter>
      </Fullscreen>
    </React.Fragment>
  );
}

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  margin: 0;
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 540px) {
    justify-content: center;
  }

  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-end;
  }

  @media (min-width: 1580px) {
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  height: 100%;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;

  @media (max-width: 540px) {
  }

  @media (max-width: 1579px) and (min-width: 541px) {
    right: 100px;
  }

  @media (min-width: 1580px) {
    left: 1150px;
  }
`;

export default App;
