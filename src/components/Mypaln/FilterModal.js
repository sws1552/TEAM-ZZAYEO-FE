import React from "react";
import styled from "styled-components";

const DestinationModal = (props) => {
  const { showModal, closeModal, filter, setFilter } = props;

  const publicState = ["전체", "공개", "비공개"];
  const importState = ["전체", "가져온 여행"];

  const [clickedPublic, setClickedPublic] = React.useState("");
  const [clickedImport, setClickedImport] = React.useState("");

  if (showModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Overlay onClick={closeModal}>
            <Modal>
              <Taps>
                <Ul>필터</Ul>
              </Taps>
              <Container>
                <PublicContainer>
                  <p>여행 공개</p>
                  <PublicSelectBox>
                    {publicState.map((item, i) => {
                      return (
                        <div
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setClickedPublic(i);
                            setFilter(publicState[i]);
                          }}
                          style={{
                            backgroundColor:
                              i === clickedPublic ? "#4E49E2" : "#FFFFFF",
                            color: i === clickedPublic ? "#FFFFFF" : "#616161",
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </PublicSelectBox>
                </PublicContainer>
                {/* <PublicContainer>
                  <p>여행 가져오기</p>
                  <ImportSelectBox>
                    {importState.map((item, i) => {
                      return (
                        <div
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setClickedImport(i);
                            setFilter((prev) => [prev, ", ", importState[i]]);
                          }}
                          style={{
                            backgroundColor:
                              i === clickedImport ? "#4E49E2" : "#FFFFFF",
                            color: i === clickedImport ? "#FFFFFF" : "#616161",
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </ImportSelectBox>
                </PublicContainer> */}
              </Container>
              <Div>
                <Button onClick={closeModal}>
                  <p>확인</p>
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
  max-width: 420px;
  width: 100%;
  margin: auto;
`;

const OpenModal = styled(ModalBox)`
  display: flex;
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
  height: 414px;
  background-color: #ffffff;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`;

const Taps = styled.div`
  box-sizing: border-box;
  margin: 32px 0px 0px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Ul = styled.div``;

const Div = styled.div`
  position: absolute;
  width: 100%;
  bottom: 56px;
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
    font-weight: 400;
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
  flex-direction: column;
  width: 100%;
`;

const PublicContainer = styled.div`
  margin-top: 32px;
  p {
    margin: 0;
    margin-left: 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #212121;
  }
`;

const PublicSelectBox = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;

  div {
    width: 30%;
    padding: 11px 0px;
    text-align: center;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ImportSelectBox = styled(PublicSelectBox)`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;

  div {
    width: 47.5%;
    padding: 11px 0px;
    text-align: center;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

export default DestinationModal;
