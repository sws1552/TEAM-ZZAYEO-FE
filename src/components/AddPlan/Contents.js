import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";

import moment from "moment";
import { addDays } from "date-fns";

import DateModal from "./DateModal";

const Contents = (props) => {
  const dispatch = useDispatch();
  const { today } = props

  //여행제목 값 가져오기
  const [titleInput, setTitleInput] = useState("");

  //여행 선택일자 가져오기
  const [state, setState] = React.useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ]);

  const [msg, setMsg] = React.useState("날짜를 선택해주세요.");
  const [dateShowModal, setDateShowModal] = React.useState(false);

  //날짜 선택 모달 열기
  const dateOpenModal = () => {
    setDateShowModal(true);
  };

  //날짜 선택 모달 닫기
  const dateCloseModal = () => {
    setDateShowModal(false);
    setState(state);
    setMsg(
      moment(state[0].startDate).format("YYYY.MM.DD") +
        "-" +
        moment(state[0].endDate).format("MM.DD")
    );
  };

  React.useEffect(() => {}, [state]);

  //어디로
  const destList = ["국내", "해외"];
  const [clickedTripDest, changeTripDest] = React.useState(null);
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
  const [clickedWithList, changeWithList] = React.useState(null);

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
  const [clickedTripstyle, changeTripstyle] = React.useState(null);

  const createPlan = () => {
    if (titleInput === "") {
      window.alert("제목을 입력해주세요!");
      return;
    }
    if (clickedTripDest === null) {
      window.alert("여행지를 선택해주세요!");
      return;
    }
    if (clickedWithList === null) {
      window.alert("누구랑 여행 했는지 선택해주세요!");
      return;
    }
    if (clickedTripstyle === null) {
      window.alert("여행 스타일을 선택해주세요!");
      return;
    }
    let plan = {
      title: titleInput,
      destination: destList[clickedTripDest],
      withlist: withList[clickedWithList],
      startDate: moment(state[0].startDate).format("YYYY-MM-DD"),
      endDate: moment(state[0].endDate).format("YYYY-MM-DD"),
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
            maxLength="25"
          />
        </InputBox>
      </TitleBox>
      <DateBox>
        <Text>언제</Text>
        <Date onClick={dateOpenModal}>
          <p>{msg}</p>
        </Date>
        <DateModal
          dateShowModal={dateShowModal}
          dateCloseModal={dateCloseModal}
          state={state}
          setState={setState}
        ></DateModal>
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
                    i === clickedTripDest ? "#4E49E2" : "#F4F4F4",
                  color: i === clickedTripDest ? "#FFFFFF" : "#9E9E9E",
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
                    i === clickedWithList ? "#4E49E2" : "#F4F4F4",
                  color: i === clickedWithList ? "#FFFFFF" : "#9E9E9E",
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
                    i === clickedTripstyle ? "#4E49E2" : "#F4F4F4",
                  color: i === clickedTripstyle ? "#FFFFFF" : "#9E9E9E",
                }}
              >
                {l}
              </li>
            );
          })}
        </div>
      </TripstyleBox>
      <Button onClick={createPlan}>
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
  margin-bottom: 38px;
`;

const Text = styled.div`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #212121;
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

const DateBox = styled.div`
  width: 100%;
  margin-bottom: 38px;
`;

const Date = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 41px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #757575;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TripDestBox = styled(TitleBox)`
  div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 0px 8px 10px 0px;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 50px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }
`;

const WithListBox = styled(TripDestBox)``;

const TripstyleBox = styled(WithListBox)``;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 34px 0px 70px;
  width: 100%;
  height: 54px;
  background-color: #bdbdbd;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;

  :hover {
    background-color: #4e49e2;
    color: #ffffff;
  }
`;

export default Contents;
