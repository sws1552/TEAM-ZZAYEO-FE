import React from "react";
import styled from "styled-components";
import BottomContents from "./BottomContents";
import TopContents from "./TopContents";

const ScreenBackground = (props) => {
  return (
    <React.Fragment>
      <Backscreen>
        <BackTop>
          <TopContents />
        </BackTop>
        <BottomContents />
      </Backscreen>
    </React.Fragment>
  );
};

const Backscreen = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0;
  background: #f5f5f5;
  position: relative;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 540px) {
    display: none;
  }

  @media (max-width: 1579px) and (min-width: 541px) {
  }

  @media (min-width: 1580px) {
  }
`;

const BackTop = styled.div`
  top: 0;
  width: 100%;
  height: 352px;
  box-sizing: border-box;
  position: absolute;

  @media (max-width: 540px) {
    background: rgba(78, 73, 226, 0.6);
  }

  @media (max-width: 1579px) and (min-width: 700px) {
    background: rgba(78, 73, 226, 0.6);
  }

  @media (min-width: 1580px) {
    background: rgba(78, 73, 226, 0.6);
  }
`;

export default ScreenBackground;
