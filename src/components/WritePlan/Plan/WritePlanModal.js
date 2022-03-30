import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { actionCreators as planActions } from "../../../redux/modules/plan";
import { actionCreators as imageActions } from "../../../redux/modules/image";
import { actionCreators as mapActions } from "../../../redux/modules/map";

import styled from "styled-components";
import Upload from "../../../shared/Upload";
import SearchModal from "./SearchModal";
import TimeModal from "./TimeModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "420px",
  height: "100%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
};

export default function BasicModal(props) {
 
  const dayId = props.dayId;
  const planId = props.planId;
  const dayNumber = props.dayNumber;

  const dispatch = useDispatch();

  const [Memo, setMemo] = React.useState("");

  const placeName = useSelector((state) => state.addPlace.placeName);
  const lat = useSelector((state) => state.addPlace.lat);
  const lng = useSelector((state) => state.addPlace.lng);
  const address = useSelector((state) => state.addPlace.address);
  const imageURL = useSelector((state) => state.image.imageURL);

  const memoChange = (e) => {
    setMemo(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //시간추가하기
  const [AmPm, setAmPm] = React.useState("오전");
  const [Hour, setHour] = React.useState("0");
  const [Minute, setMinute] = React.useState("00");

  const [msg, setMsg] = React.useState("+ 시간을 추가해주세요.");
  const [timeModal, setTimeModal] = React.useState(false);

  const timeOpenModal = () => {
    setTimeModal(true);
  };

  const timeCloseModal = (e) => {
    setTimeModal(false);
    setAmPm(AmPm);
    setHour(Hour);
    setMinute(Minute);
    setMsg(AmPm + " " + Hour + "시 " + Minute + "분");
  };

  return (
    <div>
      <ADDPlace
        onClick={() => {
          handleOpen();
          dispatch(mapActions.sendDayId(dayId));
          dispatch(imageActions.initialdbimage([]))
        }}
      >
        + 장소를 추가해주세요
      </ADDPlace>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Addplanbox>
              <Addplan>일정추가</Addplan>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMemo("");
                  dispatch(imageActions.initialPreview([]));
                  dispatch(imageActions.initialImage([]));
                  setOpen(false);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                    fill="#212121"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893Z"
                    fill="#212121"
                  />
                </svg>
              </div>
            </Addplanbox>
            <TitleText>시간</TitleText>
            <Time onClick={timeOpenModal}>
              <p>{msg}</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8.5" stroke="#8F8CF1" />
                <path
                  d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5"
                  stroke="#8F8CF1"
                  strokeLinecap="round"
                />
              </svg>
            </Time>
            <TimeModal
              timeModal={timeModal}
              timeCloseModal={timeCloseModal}
              Hour={Hour}
              setHour={setHour}
              Minute={Minute}
              setMinute={setMinute}
              AmPm={AmPm}
              setAmPm={setAmPm}
            ></TimeModal>
            <TitleText>장소</TitleText>
            <Location>
              <SearchLoaction>
                <SearchModal />
              </SearchLoaction>
            </Location>

            <TitleText>메모</TitleText>
            <div style={{ marginBottom: "24px"}}>
              <MemoContainer
                value={Memo}
                onChange={memoChange}
                placeholder="메모를 작성해주세요"
                cols="50"
                rows="10"
              />
            </div>
            <TitleText>사진</TitleText>
            <div>
              <Upload />
            </div>
            <AddButton
              onClick={() => {
                dispatch(
                  planActions.saveLocationDB(
                    dayId,
                    AmPm,
                    Hour,
                    Minute,
                    Memo,
                    placeName,
                    lat,
                    lng,
                    address,
                    imageURL,
                    planId
                  )
                );
                setMemo("");
                dispatch(imageActions.initialPreview([]));
                dispatch(imageActions.initialImage([]));
                setOpen(false);
              }}
            >
              장소추가하기
            </AddButton>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Addplanbox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 42px;
  margin-top: 24px;
  margin-bottom: 11px;
  line-height: 42px;
`;

const Addplan = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #222b45;
  font-family: "Roboto", sans-serif;
`;
const TitleText = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #212121;
  margin-bottom: 14px;
`;

const Location = styled.div`
  width: 100%;
  border: 1px solid #bdbdbd;
  height: 41px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 24px;
`;

const SearchLoaction = styled.div`
  width: 100%;
  line-height: 41px;
  margin-left: 16px;
`;
const MemoContainer = styled.textarea`
  padding: 16px;
  width: 100%;
  border: 1px solid #bdbdbd;
  margin: auto;
  height: 112px;
  border-radius: 4px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    line-height: 16.41px;
    color: #757575;
    font-size: 14px;
    font-weight: 400;
  }
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 147px auto 36px auto;
  width: 100%;
  height: 54px;
  background-color: #4e49e2;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
`;
const ADDPlace = styled.div`
  color: gray;
  border: none;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const Time = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 41px;
  padding-left: 16px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #757575;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    padding-right: 16px;
  }
`;
