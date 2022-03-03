import React from "react";
import styled from "styled-components";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

const DateModal = (props) => {
  const { open, close } = props;

  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let day = today.getDate(); // 날짜

  let date = year + ", " + month + ", " + day;

  if (open) {
    return (
      <OpenModal>
        <Section>
          <ModalContent>
            <RangeDatePicker
              startDate={new Date(date)}
              endDate={new Date(date)}
            />
          </ModalContent>
          <Footer>
            <Button onClick={close}>닫기</Button>
          </Footer>
        </Section>
      </OpenModal>
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
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -300px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OpenModal = styled(ModalBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  margin: auto;
  max-width: 350px;
  border-radius: 0.3rem;
  background-color: #fff;
  overflow: hidden;
`;

const ModalContent = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const Button = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  border: 0;
`;

export default DateModal;
