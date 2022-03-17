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
    height: "720px",
    bgcolor: 'background.paper',
    border: 'none',
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
              <div onClick={() => {
                handleOpen()
            }}>수정하기</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Container>
                        <Addplanbox>
                            <Addplan>일정수정</Addplan>
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setHour("0");
                                    setMinute("00");
                                    setAmPm("오전");
                                    setMemo("");
                                    dispatch(imageActions.initialPreview([]));
                                    dispatch(imageActions.initialImage([]));
                                    setOpen(false)
                                }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#212121" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893Z" fill="#212121" />
                                </svg>

                            </div>
                        </Addplanbox>



                        <TitleText>시간</TitleText>
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
                        
                        <TitleText>장소</TitleText>
                        <Location>
                            <SearchLoaction>
                                <SearchModal />
                            </SearchLoaction>
                        </Location>
                       
                      
                        <TitleText>메모</TitleText>
                        <div style={{marginBottom:"24px"}}>
                            <MemoContainer
                                style={{}}
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

const Addplanbox = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
height: 42px;
margin-top: 24px;
margin-bottom: 11px;
line-height: 42px;
`

const Addplan = styled.div`
font-weight: 700;
font-size: 18px;
color: #222B45;
font-family: "Roboto", sans-serif;
`
const TitleText = styled.div`
font-family: "Roboto", sans-serif;
font-weight: 600;
font-size: 16px;
color: #212121;
margin-bottom: 14px;
`

const Time = styled.div`
  width: 100%;
  margin: auto;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
`;
const Location = styled.div`
  width: 100%;
  border: 1px solid #BDBDBD;
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
  border: 1px solid #BDBDBD;
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
    color: #BDBDBD;
    font-size: 14px;
    font-weight: 500;
  }
`;


const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px auto 36px auto;
  width: 100%;
  height: 54px;
  background-color: #4E49E2;
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
`
