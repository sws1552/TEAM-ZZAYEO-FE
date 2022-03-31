import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/ConfigureStore";
import Like from "../Main/Like";
import Bookmark from "../Main/Bookmark";

const MainBookMark = (props) => {
  const planId = props.planId;

  
  const bookmark_list = useSelector((store) => store.plan.bookmark_list);
  const plan = bookmark_list.find((p) => p.planId === planId);
  const userId = plan.planId.userId.userId;


  const onProfile = (e) => {
    e.stopPropagation();
    history.push(`/otheruser/${userId}`);
  };

  const onPlanInfo = (e) => {
    e.stopPropagation();
    history.push(`/detail/${plan.planId.planId}`);
  };

  const defaultUrl = [
    "../../images/1.png",
    "../../images/2.png",
    "../../images/3.png",
    "../../images/4.png",
    "../../images/5.png",
    "../../images/6.png",
  ];
  
  let imgUrl = (Math.floor(Math.random() * defaultUrl.length));

  return (
    <React.Fragment>
      <Container>
        <TripCard onClick={onPlanInfo}>
          <CardImg
          src={
            plan.planId.thumbnailImage
              ? plan.planId.thumbnailImage
              : defaultUrl[imgUrl]
          }
          ></CardImg>
          <Btn>
            <UserImg onClick={onProfile} src={plan.planId.userId.profile_img} />
          </Btn>
          <UserNickName>{plan.planId.userId.nickname}</UserNickName>
          <CardTitle>
            {plan.planId.title.length > 25 ? plan.planId.title.substring(0, 25) + "..." : plan.planId.title}
          </CardTitle>
          <Box>
            <Like isLike={plan.planId.isLike} />
            <Bookmark isBookmark={plan.planId.isBookmark} />
            
          </Box>
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
`;

const TripCard = styled.div`
  width: 100%;
  height: 242px;
  margin-bottom: 16px;
  border-radius: 8px;
  position: relative;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  cursor: pointer;
`;

const CardImg = styled.div`
  width: 100%;
  height: 160px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

const Btn = styled.div``;

const UserImg = styled.img`
  position: absolute;
  left: 5.13%;
  right: 76.92%;
  top: 54.55%;
  bottom: 22.31%;
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background: #eeeeee;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.06), 0px -4px 6px rgba(0, 0, 0, 0.1);
`;

const UserNickName = styled.div`
  position: absolute;
  margin: 12px 0px 0px 80px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #212121;
`;

const CardTitle = styled.div`
  position: absolute;
  padding: 40px 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #212121;
`;

const Box = styled.div`
  position: absolute;
  display: flex;
  margin-top: 4px;
  right: 12px;
`;


export default MainBookMark;
