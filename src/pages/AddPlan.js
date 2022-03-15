import React from "react";
import styled from "styled-components";
import Contents from "../components/AddPlan/Contents";

const AddPlan = (props) => {
  const { history } = props;

  return (
    <React.Fragment>
      <Container>
        <Top>
          <CancleBtn
            onClick={() => {
              history.replace("/myplan");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.29289 12.7073C2.90237 12.3168 2.90237 11.6836 3.29289 11.2931L9.65685 4.92912C10.0474 4.5386 10.6805 4.5386 11.0711 4.92912C11.4616 5.31965 11.4616 5.95281 11.0711 6.34334L6.41421 11.0002H20C20.5523 11.0002 21 11.4479 21 12.0002C21 12.5525 20.5523 13.0002 20 13.0002H6.41421L11.0711 17.657C11.4616 18.0476 11.4616 18.6807 11.0711 19.0713C10.6805 19.4618 10.0474 19.4618 9.65685 19.0713L3.29289 12.7073Z"
                fill="#212121"
              />
            </svg>
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
  width: 100%;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  height: 56px;
  padding: 0px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CancleBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const TText = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AddPlan;
