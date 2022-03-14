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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2946 0.704616C10.9053 0.315343 10.2743 0.314999 9.88462 0.703847L6 4.58L2.11538 0.703847C1.72569 0.314999 1.09466 0.315343 0.705384 0.704616C0.315811 1.09419 0.315811 1.72581 0.705385 2.11538L5.29289 6.70289C5.68342 7.09342 6.31658 7.09342 6.70711 6.70289L11.2946 2.11538C11.6842 1.72581 11.6842 1.09419 11.2946 0.704616Z"
              fill="#BDBDBD"
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2946 0.704616C10.9053 0.315343 10.2743 0.314999 9.88462 0.703847L6 4.58L2.11538 0.703847C1.72569 0.314999 1.09466 0.315343 0.705384 0.704616C0.315811 1.09419 0.315811 1.72581 0.705385 2.11538L5.29289 6.70289C5.68342 7.09342 6.31658 7.09342 6.70711 6.70289L11.2946 2.11538C11.6842 1.72581 11.6842 1.09419 11.2946 0.704616Z"
              fill="#BDBDBD"
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
