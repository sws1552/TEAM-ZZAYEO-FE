import React from "react";
import styled from "styled-components";
import Destination from "./Category/Destination";
import Style from "./Category/Style";

const CategoryModal = (props) => {
  const { open, close } = props;

  const [activeTab, setActiveTab] = React.useState(0);

  const category = ["국내", "여행 스타일"];

  const categoryContents = {
    0: <Destination />,
    1: <Style />,
  };

  const onClick = (id) => {
    setActiveTab(id);
  };

  if (open) {
    return (
      <React.Fragment>
        <OpenModal>
          <Modal>
            <Taps>
              {/* <li onClick={() => onClick(0)}>국내</li>
              <li onClick={() => onClick(1)}>여행스타일</li> */}
              {category.map((c, i) => {
                return (
                  <Li
                    style={{ color: i === activeTab ? "#000000" : "#bfbfbf" }}
                    key={i}
                    onClick={() => onClick(i)}
                  >
                    {c}
                  </Li>
                );
              })}
            </Taps>
            <div>{categoryContents[activeTab]}</div>
            <Div>
              <Button onClick={close}>
                <p>여행 확인하기</p>
              </Button>
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
  height: 586px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`;

const Taps = styled.div`
  box-sizing: border-box;
  margin: 24px 0px 24px 24px;
  display: inline-flex;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
`;

const Li = styled.li`
  list-style-type: none;
  margin-right: 24px;
`;

const Div = styled.div`
  position: absolute;
  width: 100%;
  bottom: 36px;
`;
const Button = styled.div`
  height: 48px;
  margin: 0px 24px;
  background-color: #535353;
  border-radius: 8px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default CategoryModal;
