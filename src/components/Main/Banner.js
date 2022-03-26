import React from "react";
import styled from "styled-components";
import { ReactComponent as SvgImg } from "../../shared/svg/Frame.svg";

const Banner = (props) => {
  return (
    <Container>
      <p>
        짜여와 함께
        <br />
        여행 짤 준비됐나요?
      </p>
      <ImgCon>
        <SvgImg />
      </ImgCon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 148px;
  padding: 0px 24px;
  background-color: #cfcfff;

  p {
    margin: 0;
    padding-bottom: 40px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #212121;
  }
`;

const ImgCon = styled.div`
  margin-bottom: 10px;
`;
export default Banner;
