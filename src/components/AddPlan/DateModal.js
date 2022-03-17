import React from "react";
import styled from "styled-components";

import { DateRange } from "react-date-range";
import { ko } from "date-fns/esm/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DateModal.css";

const DateModal = (props) => {
  const { dateShowModal, dateCloseModal, state, setState } = props;

  if (dateShowModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Modal>
            <Header>
              <CancelBtn onClick={dateCloseModal}>
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
                    d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                    fill="#212121"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z"
                    fill="#212121"
                  />
                </svg>
              </CancelBtn>
              <Text>여행날짜 선택</Text>
              <Info>여행 날짜를 알려주세요</Info>
            </Header>
            <DateRangeDiv>
              <MyDateRange
                locale={ko}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                months={2}
                direction="vertical"
              />
            </DateRangeDiv>
            <Div>
              <Button onClick={dateCloseModal}>등록완료</Button>
            </Div>
          </Modal>
        </OpenModal>
      </React.Fragment>
    );
  }
  return null;
};

const ModalBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 9999;
  overflow-y: auto;
  max-width: 420px;
  width: 100%;
  margin: auto;
`;

const OpenModal = styled(ModalBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 420px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  padding: 16px;
`;

const CancelBtn = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

const Text = styled.div`
  padding: 56px 8px 4px;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 4px;
`;

const Info = styled.div`
  padding: 0px 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #757575;
`;

const DateRangeDiv = styled.div`
  width: 100%;
`;

const MyDateRange = styled(DateRange)`
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  position: absolute;
  width: 100%;
  bottom: 36px;
  font-family: "Roboto", sans-serif;
`;

const Button = styled.div`
  height: 54px;
  margin: 0px 24px;
  background-color: #bdbdbd;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  bottom: 0;

  p {
    margin: 0;
    color: #ffffff;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
  }

  :hover {
    background-color: #4e49e2;
    color: #ffffff;
  }
`;

export default DateModal;
