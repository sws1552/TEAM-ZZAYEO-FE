import React from "react";
import styled from "styled-components";
import TimeModal from "../components/AddPlace/TimeModal";
import { history } from "../redux/ConfigureStore";
import Upload from "../shared/Upload";
import Timedropdown from "../components/AddPlace/Timedropdown";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const AddPlace = () => {
  const dispatch = useDispatch();
  const [Hour, setHour] = React.useState("0");
  const [Minute, setMinute] = React.useState("00");
  const [AmPm, setAmPm] = React.useState("오전");
  const [Memo, setMemo] = React.useState("");
  const dayId = useSelector((state) => state.map.dayId);
  const placeName = useSelector((state) => state.addPlace.placeName);
  const lat = useSelector((state) => state.addPlace.lat);
  const lng = useSelector((state) => state.addPlace.lng);
  const address = useSelector((state) => state.addPlace.address);
  const imageURL = useSelector((state) => state.addPlace.imageURL);

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

  return (
    <>
      <Container>
        <br />
        <div style={{ fontSize: "30px" }}>day1</div>
        <br />
        <div>시간</div>
        <br />
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
        <br />
        <div>장소</div>
        <br />
        <Location>
          {placeName !== "" ? (
            <SearchLoaction
              onClick={() => {
                history.push("/searchplace");
              }}
            >
              {placeName}
            </SearchLoaction>
          ) : (
            <SearchLoaction
              onClick={() => {
                history.push("/searchplace");
              }}
            >
              +장소를 검색해주세요
            </SearchLoaction>
          )}
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
        <Button
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
                imageURL
              )
            );
            // history.push('/writeplan')
          }}
        >
          <p>장소추가하기</p>
        </Button>
        <br />
        <div>사진</div>
        <br />
        <div>
          <Upload />
        </div>
      </Container>
    </>
  );
};

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
  width: 100%;
  border: 1px solid gray;
  margin: auto;
  height: 120px;
  border-radius: 6px;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    text-align: center;
    line-height: 120px;
  }
`;

const SearchLoaction = styled.div`
  color: gray;
  font-size: 13px;
  text-align: center;
  line-height: 40px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 34px auto 0px auto;
  width: 312px;
  height: 54px;
  background-color: #12c5ed;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;
export default AddPlace;
