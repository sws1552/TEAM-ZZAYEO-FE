import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import BeforeRegister from "../components/Mypaln/BeforeRegister";
import AfterRegister from "../components/Mypaln/AfterRegister";

const Myplan = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const myplans = useSelector((store) => store.plan.myplans);

  React.useEffect(() => {
    dispatch(planActions.getMyPlanDB());
  }, []);

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
          {myplans.length === 0 ? (
            <BeforeRegister />
          ) : (
            <Div>
              <p>여행 리스트</p>
              {myplans.map((l, i) => {
                return <AfterRegister key={i} {...l} />;
              })}
            </Div>
          )}
        </Bottom>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
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
  border-bottom: 1px solid #d2dbdd;
`;

const TText = styled.div`
  position: absolute;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const Bottom = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddPlanBtn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 81px;
  margin-top: 20px;
  margin: 20px 24px 0px 24px;
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

const Div = styled.div`
  p {
    margin-left: 24px;
    margin-top: 35px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
  }
`;

export default Myplan;
