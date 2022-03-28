import React from "react";
import styled from "styled-components";
import StyleModal from "../Main/Modal/StyleModal";
import { history } from "../../redux/ConfigureStore";
import queryString from "query-string";

const Filter = (props) => {
  const search = queryString.parse(window.location.search);

  // const [destShowModal, setDestShowModal] = React.useState(false);
  const [styleShowModal, setStyleShowModal] = React.useState(false);

  // const [dest, setDest] = React.useState("국내");
  const [style, setStyle] = React.useState("여행 스타일");

  let data = { key1: search.query, key2: style };

  // 여행스타일 모달 열기
  const styleOpenModal = () => {
    setStyleShowModal(true);
  };

  // 여행스타일 모달 닫기
  const styleCloseModal = (e) => {
    e.stopPropagation();
    setStyleShowModal(false);
    history.push({
      pathname: "/search",
      search: `?query=${data.key1}&style=${data.key2}`,
      data: data,
    });
  };
  return (
    <Container>
      <SelectBox>
        <Style onClick={styleOpenModal}>
          {style}
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
        <StyleModal
          styleShowModal={styleShowModal}
          styleCloseModal={styleCloseModal}
          style={style}
          setStyle={setStyle}
        ></StyleModal>
      </SelectBox>
    </Container>
  );
};

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
  margin-bottom: 16px;
`;

const Destination = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  padding: 4px 16px;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #757575;
  cursor: pointer;

  svg {
    margin-left: 8px;
  }
`;

const Style = styled(Destination)``;

export default Filter;
