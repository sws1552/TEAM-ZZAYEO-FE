import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import BeforeRegister from "../components/Mypaln/BeforeRegister";
import AfterRegister from "../components/Mypaln/AfterRegister";

const Myplan = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const is_token = localStorage.getItem("token") ? true : false;
  const myplans = useSelector((store) => store.plan.myplans);

  React.useEffect(() => {
    dispatch(planActions.getMyPlanDB());
  }, []);

  const onAddPlan = () => {
    if (is_token) {
      return history.push("/addplan");
    }
    window.alert("로그인 후 이용가능합니다.");
    history.push("/login");
  };

  return (
    <React.Fragment>
      <Container>
        <Top>
          <TText>나의 여행</TText>
        </Top>
        <Bottom>
          <AddPlanBtn onClick={onAddPlan}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#4E49E2" />
              <path
                d="M16.3232 10.667V21.9807"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M21.9795 16.3237H10.6658"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <P>새로운 여행을 작성해주세요</P>
          </AddPlanBtn>
          {myplans?.length === 0 ? (
            <BeforeRegister />
          ) : (
            <Div>
              <p>여행 리스트</p>
              {myplans?.map((l, i) => {
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
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  height: 56px;
  padding-left: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 19px;
`;

const AddPlanBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 128px;
  margin: 0px 24px;
  background-color: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  svg {
    margin-bottom: 16px;
  }
`;

const P = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #212121;
  margin: 0;
`;

const Div = styled.div`
  p {
    margin-left: 24px;
    margin-top: 35px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
`;

export default Myplan;
