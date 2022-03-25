import React from "react";
import styled from "styled-components";
import FilterModal from "./FilterModal";
import { history } from "../../redux/ConfigureStore";
import { useLocation } from "react-router";

const Filter = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const [filter, setFilter] = React.useState("필터");

  let data = { key1: filter };

  // 여행스타일 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 여행스타일 모달 닫기
  const closeModal = (e) => {
    setShowModal(false);
    history.push({
      pathname: "/myplan",
      search: `?filter=${data.key1}`,
      data: data,
    });
  };
  return (
    <Container>
      <SelectBox>
        <FilterBtn
          onClick={openModal}
          style={{
            backgroundColor: filter === "필터" ? "#ffffff" : "#4E49E2",
            color: filter === "필터" ? "#212121" : "#ffffff",
          }}
        >
          {filter}
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
        </FilterBtn>
        <FilterModal
          showModal={showModal}
          closeModal={closeModal}
          filter={filter}
          setFilter={setFilter}
        ></FilterModal>
      </SelectBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 24px;
  box-sizing: border-box;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const FilterBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #ffffff;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  cursor: pointer;

  svg {
    margin-left: 8px;
  }

  p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
`;

export default Filter;
