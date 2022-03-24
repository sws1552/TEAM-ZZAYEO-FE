import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import DetailDay from "../components/MainDetailPage/DetailDay";
import DetailDayhide from "../components/MainDetailPage/DetailDayhide";
import Header from "../components/MainDetailPage/Header";
import { Collapse } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import CommentList from "../components/Comment/CommentList";
import Thumbnail from "../components/MainDetailPage/Thumbnail";

const MainDetailPage = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const plans = useSelector((state) => state.plan.myPlan);

  const imageURL = useSelector((state) => state.image.thumbnailURL);
  const userId = localStorage.getItem("userId");

  const toggleMenu = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const [isChecked, setIsChecked] = React.useState(true);
  const [clickedTripDest, changeTripDest] = React.useState(0);

  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["비공개", "공개"];
  const share = "공개"

  const [shareShowModal, setShareShowModal] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");

  // 썸네일 설정 모달 열기
  const shareOpenModal = () => {
    setShareShowModal(true);
    setImageSrc("");
  };

  // 썸네일 설정 모달 유지
  const keepModal = (e) => {
    setShareShowModal(true);
  };

  // 썸네일 설정하고 모달 닫기
  const shareCloseModal = (e) => {
    e.stopPropagation();
    setShareShowModal(false);
    dispatch(planActions.statusDB(plans.planId, share));
    dispatch(planActions.addThumbnailDB(plans.planId, imageURL));
  };


  if (plans?.userId?.email === userId) {
    return (
      <Container>
        <Header {...plans} />
        <TripDestBox>
          <div>
            {decideShare.map((l, i) => {
              return (
                <li
                  id={l}
                  key={i}
                  onClick={() => {
                    changeTripDest(i);
                    if (l === "공개") {
                      shareOpenModal()
                    }
                    if (l === "비공개") {
                      dispatch(planActions.statusDB(plans.planId, l));
                    }
                  }}
                  style={{
                    background: i === 1 && plans.status ==="공개" ? "#4E49E2" : i === 0 && plans.status ==="비공개" ? "#4E49E2": "#EDEDED",
                    color : i === 1 && plans.status ==="공개" ? "#FFFFFF" : i === 0 && plans.status ==="비공개" ? "#FFFFFF": "#979797",
                  }}
                >
                  {l==="공개" ? "모두에게 공유" : "나만의 일정"}
                </li>
              );
            })}
            <Thumbnail
            shareShowModal={shareShowModal}
            keepModal={keepModal}
            shareCloseModal={shareCloseModal}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          ></Thumbnail>
          </div>
        </TripDestBox>
        <Collapse in={isChecked}>
          <WritePlanMap {...plans} />
        </Collapse>
        <ToggleBox>
          {isChecked ? (
            <ToogleBtn onClick={toggleMenu}>
              <svg
                width="38"
                height="8"
                viewBox="0 0 38 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37 6.5L19 2L1 6.5"
                  stroke="#BDBDBD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </ToogleBtn>
          ) : (
            <ToggleBox>
              <ToogleBtn onClick={toggleMenu}>
                <svg
                  width="38"
                  height="7"
                  viewBox="0 0 38 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L19 5.5L37 1"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </ToogleBtn>
            </ToggleBox>
          )}
        </ToggleBox>
        <DetailDay {...plans} />
        {/* {isChecked ? <DetailDay {...plans} /> : <DetailDayhide {...plans} />} */}
        <CommentList planId={planId} />
      </Container>
    );
  }

  return (
    <Container>
      <Header {...plans} />
      <Collapse in={isChecked}>
        <WritePlanMap {...plans} />
      </Collapse>
      <ToggleBox>
        {isChecked ? (
          <ToogleBtn onClick={toggleMenu}>
            <svg
              width="38"
              height="8"
              viewBox="0 0 38 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37 6.5L19 2L1 6.5"
                stroke="#BDBDBD"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </ToogleBtn>
        ) : (
          <ToggleBox>
            <ToogleBtn onClick={toggleMenu}>
              <svg
                width="38"
                height="7"
                viewBox="0 0 38 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L19 5.5L37 1"
                  stroke="#BDBDBD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </ToogleBtn>
          </ToggleBox>
        )}
      </ToggleBox>
      <DetailDay {...plans} />
      {/* {isChecked ? <DetailDay {...plans} /> : <DetailDayhide {...plans} />} */}
      <CommentList planId={planId} />
    </Container>
  );
};

export default MainDetailPage;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  height: 93%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ToggleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ToogleBtn = styled.div`
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  margin-bottom: 32px;
`;

const TripDestBox = styled(TitleBox)`
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
  }

  li {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 32px;
    margin-right: 8px;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
  }
`;
