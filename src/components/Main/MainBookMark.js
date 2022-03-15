import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/ConfigureStore";

const MainBookMark = (props) => {
  const planId = props.planId;

  const bookmark_list = useSelector((store) => store.plan.bookmark_list);
  const plan = bookmark_list.find((p) => p.planId === planId);
  const userId = plan.planId.userId.userId;

  const onProfile = (e) => {
    e.stopPropagation();
    history.push(`/otheruser/${userId}`);
  };
  return (
    <React.Fragment>
      <Container>
        <BookMarkCard
          onClick={() => {
            history.push(`detail/${planId.planId}`);
          }}
        >
          <UserInfo onClick={onProfile}>
            <img src={plan.planId.userId.profile_img} alt="" />
            <UserName>{plan.planId.userId.nickname}</UserName>
          </UserInfo>
          <CardTitle>{plan.planId.title}</CardTitle>
        </BookMarkCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 6px;
  margin-bottom: 47.35px;
`;

const BookMarkCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 152.57px;
  height: 192.65px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("https://i.pinimg.com/564x/14/cc/f4/14ccf4687851ce8f59889384c8f6018a.jpg");
  background-position: center;
  background-size: cover;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
`;

const UserInfo = styled.div`
  margin: 10px 0px 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 34px;
  }
`;

const UserName = styled.div`
  margin-left: 4.07px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`;

const CardTitle = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  padding: 0px 16.27px 15.41px;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  color: #ffffff;
`;

export default MainBookMark;
