import React from "react";
import styled from "styled-components";
import DestinationModal from "./Modal/DestinationModal";
import StyleModal from "./Modal/StyleModal";
import { history } from "../../redux/ConfigureStore";

const Filter = (props) => {
  const [destShowModal, setDestShowModal] = React.useState(false);
  const [styleShowModal, setStyleShowModal] = React.useState(false);

  const [dest, setDest] = React.useState("국내");
  const [style, setStyle] = React.useState("여행 스타일");

  let data = { key1: dest, key2: style };

  // 국내,해외 모달 열기
  const destOpenModal = () => {
    setDestShowModal(true);
  };
  // 국내,해외 모달 닫기
  const destCloseModal = (e) => {
    e.stopPropagation();
    setDestShowModal(false);
    history.push({
      pathname: "/",
      search: `?destination=${data.key1}`,
      data: data,
    });
  };

  // 여행스타일 모달 열기
  const styleOpenModal = () => {
    setStyleShowModal(true);
  };

  // 여행스타일 모달 닫기
  const styleCloseModal = (e) => {
    e.stopPropagation();
    setStyleShowModal(false);
    history.push({
      pathname: "/",
      search: `?destination=${data.key1}&style=${data.key2}`,
      data: data,
    });
  };
  return (
    <Container>
      <SelectBox>
        <Destination onClick={destOpenModal}>
          {dest}
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
        <DestinationModal
          destShowModal={destShowModal}
          destCloseModal={destCloseModal}
          dest={dest}
          setDest={setDest}
        ></DestinationModal>
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

export default Filter;
