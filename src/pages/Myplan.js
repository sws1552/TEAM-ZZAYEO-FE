import React from "react";
import styled from "styled-components";
import BeforeRegister from "../components/Mypaln/BeforeRegister";

const Myplan = (props) => {
  const { history } = props;

  return (
    <React.Fragment>
      <Container>
        <Top>
          <TText>나의 여행</TText>
        </Top>
        <Bottom>
          <AddPlanBtn
            onClick={() => {
              history.push("/addplan");
            }}
          >
            <P>+</P>
            <P>새로운 여행을 작성해주세요</P>
          </AddPlanBtn>
          <BeforeRegister />
        </Bottom>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fbeaff;
`;

const TText = styled.div`
  position: absolute;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const Bottom = styled.div`
  position: absolute;
  left: 12%;
  display: flex;
  flex-direction: column;
`;

const AddPlanBtn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 312px;
  height: 81px;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #666666;
  box-sizing: border-box;
`;
const P = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 20.27px;
  margin: 0;
`;

export default Myplan;
