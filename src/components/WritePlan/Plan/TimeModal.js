import React from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
// import WheelPicker from "react-simple-wheel-picker";

const TimeModal = (props) => {
  const {
    timeModal,
    timeCloseModal,
    Hour,
    setHour,
    Minute,
    setMinute,
    AmPm,
    setAmPm,
  } = props;

  const HOUR_SELECT = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const MINUTE_SELECT = [
    "00",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];
  const AMPM = ["오전", "오후"];

  const ampmChange = (e) => {
    setAmPm(e.target.value);
  };
  const hourChange = (e) => {
    setHour(e.target.value);
  };
  const minuteChange = (e) => {
    setMinute(e.target.value);
  };

  if (timeModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Modal>
            <Header>
              <CancelBtn onClick={timeCloseModal}>
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
              <Text>시간추가</Text>
            </Header>
            <Time>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                  defaultValue={AmPm}
                  onChange={ampmChange}
                  inputProps={{
                    name: "time",
                    id: "uncontrolled-native",
                  }}
                >
                  {AMPM.map((ampm, idx) => {
                    return (
                      <option key={idx} value={ampm}>
                        {ampm}
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                  defaultValue={Hour}
                  onChange={hourChange}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  {HOUR_SELECT.map((hour, idx) => {
                    return (
                      <option key={idx} value={hour}>
                        {hour}시
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                  defaultValue={Minute}
                  onChange={minuteChange}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  {MINUTE_SELECT.map((minute, idx) => {
                    return (
                      <option key={idx} value={minute}>
                        {minute}분
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>
            </Time>
            <Div>
              <Button onClick={timeCloseModal}>완료</Button>
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
  height: 368px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`;

const Header = styled.div`
  padding: 24px;
`;

const CancelBtn = styled.div`
  position: absolute;
  right: 24px;
  cursor: pointer;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
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

const Time = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
`;

export default TimeModal;
