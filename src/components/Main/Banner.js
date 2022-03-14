import React from "react";
import styled from "styled-components";

const Banner = (props) => {
  return (
    <Container>
      <p>
        트리플랜과 함께
        <br />
        여행을 나눌 준비됐나요?
      </p>
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
    font-family: "Roboto";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #212121;
  }
`;
export default Banner;
