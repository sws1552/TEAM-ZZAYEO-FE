import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Contents from "../components/AddPlan/Contents";

const AddPlan = (props) => {
  const { history } = props;

  return (
    <React.Fragment>
      <Container>
        <Top>
          <CancleBtn
            onClick={() => {
              history.replace("/");
            }}
          >
            <ArrowBackIcon />
          </CancleBtn>
          <TText>새로운 여행 작성</TText>
        </Top>
        <Bottom>
          <Contents />
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

const CancleBtn = styled.div`
  position: absolute;
  left: 5%;
  cursor: pointer;
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

export default AddPlan;
