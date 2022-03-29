import React from "react";
import styled from "styled-components";
import WritePlanMap from "../components/WritePlan/Map/WritePlanMap";
import HeaderWritePlan from "../components/WritePlan/Header/HeaderWriteplan";
import Title from "../components/WritePlan/Title/Title";
import { Collapse } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../redux/modules/plan";
import ChooseDay from "../components/WritePlan/Plan/ChooseDay";
import ChooseDayHide from "../components/WritePlan/Plan/ChooseDayHide";
import Thumbnail from "../components/WritePlan/Plan/Thumbnail";
import { style } from "@mui/system";

const WritePlan = (props) => {
  const dispatch = useDispatch();

  const planId = props.match.params.planId;
  const myPlan = useSelector((state) => state.plan.myPlan);
  const imageURL = useSelector((state) => state.image.thumbnailURL);
  console.log(myPlan);
  const [clickedTripDest, changeTripDest] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(true);
  const toggleMenu = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  React.useEffect(() => {
    dispatch(planActions.getdayPlanDB(planId));
  }, []);

  const decideShare = ["비공개", "공개"];
  const share = "공개";
  const unshare = "비공개";

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
  const closeModal = (e) => {
    e.stopPropagation();
    setShareShowModal(false);
  };

  // 썸네일 설정하고 모달 닫기
  const shareCloseModal = (e) => {
    e.stopPropagation();
    setShareShowModal(false);
    dispatch(planActions.statusDB(myPlan.planId, share));
    dispatch(planActions.addThumbnailDB(myPlan.planId, imageURL));
  };

  return (
    <Container>
      <HeaderWritePlan {...myPlan} />
      <Title {...myPlan} />
      <div
        style={{
          display: "flex",
          padding: "0px 24px",
          margin: "20px 0px 32px 0px",
        }}
      >
        {decideShare.map((l, i) => {
          return (
            <PlanBox
              key={i}
              onClick={() => {
                changeTripDest(i);
                if (l === "공개") {
                  shareOpenModal();
                }
                if (l === "비공개") {
                  dispatch(planActions.statusDB(myPlan.planId, l));
                }
              }}
              style={{
                background:
                  i === 1 && myPlan.status === "공개"
                    ? "#4E49E2"
                    : i === 0 && myPlan.status === "비공개"
                    ? "#4E49E2"
                    : "#EDEDED",
                color:
                  i === 1 && myPlan.status === "공개"
                    ? "#FFFFFF"
                    : i === 0 && myPlan.status === "비공개"
                    ? "#FFFFFF"
                    : "#979797",
              }}
            >
              {l === "공개" ? "모두에게 공유" : "나만의 일정"}
            </PlanBox>
          );
        })}
        <Thumbnail
          shareShowModal={shareShowModal}
          keepModal={keepModal}
          shareCloseModal={shareCloseModal}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          closeModal={closeModal}
        ></Thumbnail>
      </div>

      <Collapse in={isChecked}>
        <WritePlanMap {...myPlan} />
      </Collapse>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {isChecked ? (
          <div onClick={() => toggleMenu()} style={{ cursor: "pointer" }}>
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
          </div>
        ) : (
          <>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div onClick={() => toggleMenu()} style={{ cursor: "pointer" }}>
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
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* {isChecked ? <ChooseDay {...myPlan} /> : <ChooseDayHide {...myPlan} />} */}
      <ChooseDay {...myPlan} />
    </Container>
  );
};

export default WritePlan;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  height: 93%;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PlanBox = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: fit-content;
  margin-right: 8px;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
