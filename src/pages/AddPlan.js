import React from "react";
import styled from "styled-components";
import DateModal from "../components/AddPlan/DateModal";

const AddPlan = (props) => {
  const { history } = props;

  const [modalopen, setModalopen] = React.useState(false);

  //날짜 모달 열기
  const openModal = () => {
    setModalopen(true);
  };

  //날짜 모달 닫기
  const closeModal = () => {
    setModalopen(false);
  };

  return (
    <React.Fragment>
      <Container>
        <Top>
          <TText>새로운 일정 작성</TText>
          <CancleBtn
            onClick={() => {
              history.replace("/");
            }}
          >
            X
          </CancleBtn>
        </Top>
        <Bottom>
          <Title>여행 계획을 알려주세요.</Title>
          <BText>언제 여행을 떠나실건가요?</BText>
          <Date onClick={openModal}></Date>
          <DateModal open={modalopen} close={closeModal}></DateModal>
        </Bottom>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
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
  font-size: 20px;
  font-weight: 500;
  line-height: 23.17px;
`;

const CancleBtn = styled.div`
  position: absolute;
  right: 10%;
  cursor: pointer;
`;

const Bottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 118px 0px 0px 24px;
  font-size: 24px;
  font-weight: 600;
  line-height: 25px;
`;

const BText = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 23.17px;
  margin: 24px;
`;

const Date = styled.div`
  width: 312px;
  height: 41px;
  border: 2px solid #fbeaff;
`;

export default AddPlan;
