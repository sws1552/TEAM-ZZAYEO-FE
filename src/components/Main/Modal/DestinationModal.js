import React from "react";
import styled from "styled-components";

const DestinationModal = (props) => {
  const { destShowModal, destCloseModal, setDest } = props;

  const destination = ["국내", "해외"];
  const [clickedDestination, changeDestination] = React.useState(0);

  if (destShowModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Overlay onClick={destCloseModal}>
            <Modal>
              <Taps>
                <Ul>지역</Ul>
              </Taps>
              <Container>
                {destination.map((l, i) => {
                  return (
                    <Category
                      onClick={(e) => {
                        e.stopPropagation();
                        changeDestination(i);
                        setDest(destination[i]);
                      }}
                      style={{
                        backgroundColor:
                          i === clickedDestination ? "#4E49E2" : "#F5F5F5",
                        // color: i === clickedDestination ? "#FFFFFF" : "#757575",
                      }}
                      key={i}
                    >
                      <p>{l}</p>
                    </Category>
                  );
                })}
              </Container>
              <Div>
                <Button onClick={destCloseModal}>
                  <p>여행 확인하기</p>
                </Button>
              </Div>
            </Modal>
          </Overlay>
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

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 420px;
  width: 100%;
  height: 418px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`;

const Taps = styled.div`
  box-sizing: border-box;
  margin: 32px 0px 24px 24px;
  display: inline-flex;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Ul = styled.div`
  list-style-type: none;
  margin-right: 24px;
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  width: 112px;
  height: 112px;
  margin-right: 8px;
  margin: 0px 18px;
  border-radius: 50%;
  cursor: pointer;

  p {
    position: absolute;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    color: #424242;
    margin-top: 120px;
  }
`;

export default DestinationModal;
