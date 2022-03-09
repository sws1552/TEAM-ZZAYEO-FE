import React from "react";
import styled from "styled-components";
import CategoryModal from "./CategoryModal";

const MainCategory = (props) => {
  let [modalopen, setModalopen] = React.useState(false);

  //카테고리 모달 열기
  const openModal = () => {
    setModalopen(true);
  };

  //카테고리 모달 닫기
  const closeModal = () => {
    setModalopen(false);
  };

  return (
    <Container>
      <SelectBox>
        <Destination onClick={openModal}>
          어디로
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#BFBFBF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Destination>
        <CategoryModal open={modalopen} close={closeModal}></CategoryModal>
        <Style onClick={openModal}>
          여행스타일
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#BFBFBF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Style>
      </SelectBox>
    </Container>
  );
};

export default MainCategory;

const Container = styled.div`
  padding: 0px 24px;
  position: relative;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

const Destination = styled.div`
  color: #535353;
  border: 1px solid #ededed;
  box-sizing: border-box;
  border-radius: 15.5px;
  padding: 4px 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 8px;
  }
`;

const Style = styled(Destination)``;
