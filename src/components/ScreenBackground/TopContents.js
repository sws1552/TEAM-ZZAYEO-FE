import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../../shared/svg/logo.svg";
import { ReactComponent as CharactersImg } from "../../shared/svg/img_splash_cha.svg";

const TopContents = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Contents>
          <Div>
            <LogoImg />
            <Text1>우리 함께 여행 짜여✈️</Text1>
            <Text2>
              내 여행 자랑하고️, 가고픈 여행 계획하고️
              <br /> 다른 사람 여행도 볼 수 있지여
            </Text2>
          </Div>
          <CharactersImg />
        </Contents>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: absolute;

  @media (max-width: 540px) {
    justify-content: center;
  }

  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-start;
    left: 100px;
    bottom: 33px;
  }

  @media (min-width: 1580px) {
    left: 399px;
    bottom: 33px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Div = styled.div`
  margin-right: 23px;
`;

const Text1 = styled.div`
  margin-top: 33px;
  font-weight: 600;
  font-size: 30px;
  line-height: 34px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const Text2 = styled.div`
  margin-top: 21px;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #cfcfff;
  margin-bottom: 16px;
`;

export default TopContents;
