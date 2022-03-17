import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as planActions } from "../../../redux/modules/plan";
import { actionCreators as imageActions } from "../../../redux/modules/image";
import { actionCreators as mapActions } from "../../../redux/modules/map"
import { actionCreators as addPlaceActions } from "../../../redux/modules/addPlace";

import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../../redux/ConfigureStore";
import Upload from "../../../shared/Upload";
import SearchModal from "./SearchModal"
import SearchMap from "./SearchMap"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height: "800px",
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,

};

export default function BasicModal(props) {
    const { placeId } = props
    
    const dispatch = useDispatch();
    const [Hour, setHour] = React.useState("0");
    const [Minute, setMinute] = React.useState("00");
    const [AmPm, setAmPm] = React.useState("오전");
    const [Memo, setMemo] = React.useState("");

    const placeName = useSelector((state) => state.addPlace.placeName);
    const lat = useSelector((state) => state.addPlace.lat);
    const lng = useSelector((state) => state.addPlace.lng);
    const address = useSelector((state) => state.addPlace.address);
    const imageURL = useSelector((state) => state.image.imageURL);
    const geometry = useSelector((state) => state.addPlace.geometry);

    const memoChange = (e) => {
        setMemo(e.target.value);
    };
    const ampmChange = (e) => {
        setAmPm(e.target.value);
    };
    const hourChange = (e) => {
        setHour(e.target.value);
    };
    const minuteChange = (e) => {
        setMinute(e.target.value);
    };

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <EditButton onClick={() => {
                handleOpen()
                // dispatch(mapActions.sendDayId(dayId))
            }}>수정하기</EditButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Container>
                        <br />
                        <div style={{ fontSize: "30px" }}>일정 수정하기</div>
                        <br />
                        <div>시간</div>
                        <br />
                        <Time>
                            <FormControl sx={{ m: 1, minWidth: 90 }}>
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

                            <FormControl sx={{ m: 1, minWidth: 90 }}>
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

                            <FormControl sx={{ m: 1, minWidth: 90 }}>
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
                        <br />
                        <div>장소</div>
                        <br />
                        <Location>
                            <SearchLoaction>
                                <SearchModal />
                            </SearchLoaction>
                        </Location>
                        <br />
                        <div>메모</div>
                        <br />
                        <div>
                            <MemoContainer
                                style={{}}
                                value={Memo}
                                onChange={memoChange}
                                placeholder="+메모를 입력해주세요"
                                cols="50"
                                rows="10"
                            />
                        </div>
                        <br />
                        <div>사진</div>
                        <br />
                        <div>
                            <Upload />
                        </div>
                        <AddButton
                            onClick={() => {
                                dispatch(
                                    planActions.editMyPostDB(
                                        placeId,
                                        AmPm,
                                        Hour,
                                        Minute,
                                        Memo,
                                        placeName,
                                        lat,
                                        lng,
                                        address,
                                        imageURL,
                                        geometry,
                                    )
                                );
                                setHour("0");
                                setMinute("00");
                                setAmPm("오전");
                                setMemo("");
                                dispatch(imageActions.initialPreview([]));
                                dispatch(imageActions.initialImage([]));
                                setOpen(false)
                            }}
                        >
                            장소수정하기
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

const Time = styled.div`
  width: 100%;
  margin: auto;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
`;
const Location = styled.div`
  width: 100%;
  border: 1px solid gray;
  margin: auto;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
`;

const MemoContainer = styled.textarea`
  padding: 15px;
  width: 100%;
  border: 1px solid gray;
  margin: auto;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
        display: none;
    }
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    text-align: center;
    line-height: 85px;
  }
`;

const SearchLoaction = styled.div`
  color: gray;
  font-size: 13px;
  text-align: center;
  line-height: 40px;
  width: 100%;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 34px auto 0px auto;
  width: 100%;
  height: 54px;
  background-color: #4E49E2;
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
`

const EditButton = styled.div`
`