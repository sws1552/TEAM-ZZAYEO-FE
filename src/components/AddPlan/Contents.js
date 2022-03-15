import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";
import { history } from "../../redux/ConfigureStore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Contents = (props) => {
  const dispatch = useDispatch();

  //여행제목 값 가져오기
  const [titleInput, setTitleInput] = useState("");
  //console.log(titleInput);

  //여행 선택일자 가져오기
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  //console.log(dateRange, startDate, endDate);

  //어디로
  const destList = ["국내", "해외"];
  const [clickedTripDest, changeTripDest] = React.useState(0);
  //console.log(destList[clickedTripDest]);

  const withList = [
    "혼자",
    "연인과",
    "친구와",
    "배우자와",
    "부모님과",
    "아이와",
    "가족과",
    "자매와",
    "형제와",
    "동행과",
    "기타",
  ];
  const [clickedWithList, changeWithList] = React.useState(0);

  const tripStyle = [
    "액티비티 체험",
    "문화 예술 역사 체험",
    "명소 관광지 방문필수",
    "페스티벌 참여",
    "먹방투어",
    "쇼핑 좋아",
    "편하게 쉬는 휴양",
    "SNS 핫플 투어",
    "호캉스",
    "자연친화",
  ];
  const [clickedTripstyle, changeTripstyle] = React.useState(0);

  console.log();

  const createPlan = () => {
    let plan = {
      title: titleInput,
      destination: destList[clickedTripDest],
      withlist: withList[clickedWithList],
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      style: tripStyle[clickedTripstyle],
    };
    dispatch(planActions.createPlanDB(plan));
  };

  return (
    <Container>
      <TitleBox>
        <Text>여행제목</Text>
        <InputBox>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
        </InputBox>
      </TitleBox>
      <DateBox>
        <Text>언제</Text>
        <MyDatePicker
          placeholderText="날짜를 선택해주세요."
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          dateFormat="yyyy-MM-dd"
          withPortal
          //isClearable={true} 취소버튼 보이게하기
        />
      </DateBox>
      <TripDestBox>
        <Text>어디로</Text>
        <div>
          {destList.map((l, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  changeTripDest(i);
                }}
                style={{
                  backgroundColor:
                    i === clickedTripDest ? "#12C5ED" : "#EDEDED",
                  color: i === clickedTripDest ? "#FFFFFF" : "#979797",
                }}
              >
                {l}
              </li>
            );
          })}
        </div>
      </TripDestBox>
      <WithListBox>
        <Text>누구랑</Text>
        <div>
          {withList.map((l, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  changeWithList(i);
                }}
                style={{
                  backgroundColor:
                    i === clickedWithList ? "#12C5ED" : "#EDEDED",
                  color: i === clickedWithList ? "#FFFFFF" : "#979797",
                }}
              >
                {l}
              </li>
            );
          })}
        </div>
      </WithListBox>
      <TripstyleBox>
        <Text>여행스타일</Text>
        <div>
          {tripStyle.map((l, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  changeTripstyle(i);
                }}
                style={{
                  backgroundColor:
                    i === clickedTripstyle ? "#12C5ED" : "#EDEDED",
                  color: i === clickedTripstyle ? "#FFFFFF" : "#979797",
                }}
              >
                {l}
              </li>
            );
          })}
        </div>
      </TripstyleBox>
      <Button
        onClick={() => {
          "ㅎㅇ";
          createPlan();
        }}
      >
        <p>세부일정 작성하기</p>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 24px 0px 24px;
`;

const TitleBox = styled.div`
  width: 100%;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 12px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #bdbdbd;
  width: 100%;
  height: 41px;
  padding-left: 8px;

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 0;
    :focus {
      outline: none;
    }
  }
`;

const DateBox = styled(TitleBox)``;

const MyDatePicker = styled(DatePicker)`
  display: block;
  width: 312px;
  height: 41px;
  text-align: center;
`;

const TripDestBox = styled(TitleBox)`
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 32px;
    margin: 0px 10px 5px 0px;
    padding: 15px 12px;
    box-sizing: border-box;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const WithListBox = styled(TripDestBox)``;

const TripstyleBox = styled(WithListBox)``;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 34px 0px 70px;
  width: 312px;
  height: 54px;
  background-color: #12c5ed;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export default Contents;
