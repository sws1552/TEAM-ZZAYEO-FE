import React from "react";
import styled from "styled-components";

const LineUpModal = (props) => {
  const { lineupModal, lineupCloseModal, setLineup } = props;

  const lineup = ["최신순", "인기순"];
  const [clickedLineup, changeLineup] = React.useState(0);

  if (lineupModal) {
    return (
      <React.Fragment>
        <OpenModal>
          <Overlay onClick={lineupCloseModal}>
            <Modal>
              <Taps>
                <Ul>정렬</Ul>
              </Taps>
              <Container>
                {lineup.map((l, i) => {
                  return (
                    <Category
                      onClick={(e) => {
                        e.stopPropagation();
                        changeLineup(i);
                        setLineup(lineup[i]);
                      }}
                      style={{
                        backgroundColor:
                          i === clickedLineup ? "#4E49E2" : "#F5F5F5",
                        color: i === clickedLineup ? "#FFFFFF" : "#212121",
                      }}
                      key={i}
                    >
                      {l}
                    </Category>
                  );
                })}
              </Container>
              <Div>
                <Button onClick={lineupCloseModal}>
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
  /* right: 0; */
  bottom: 0;
  /* left: 0; */
  background: rgba(0, 0, 0, 0.72);
  z-index: 9999;
  overflow-y: auto;
  max-width: 420px;
  width: 100%;
  @media (max-width: 540px) {
    margin: auto;
    left: 0;
    right: 0;
  }
`;

const OpenModal = styled(ModalBox)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1580px) {
  justify-content: flex-end;
  left: 1150px;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
  right: 100px;
  }
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 24px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 16px;
  margin-right: 8px;
  border-radius: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;

export default LineUpModal;
