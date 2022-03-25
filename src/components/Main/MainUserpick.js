import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/ConfigureStore";

const MainUserpick = (props) => {
  const planId = props.planId;

  const userpick_list = useSelector((store) => store.plan.userpick_list);

    // console.log('userpick_list !! ', userpick_list);

  const plan = userpick_list.find((p) => {
     return p.planId === planId;
    });
  const userId = plan.userId.userId;

  const onProfile = (e) => {
    e.stopPropagation();
    history.push(`/otheruser/${userId}`);
  };
  return (
    <React.Fragment>
      <Container>
        <BookMarkCard
          onClick={() => {
            history.push(`detail/${plan.planId}`);
          }}
          src={
            plan.thumbnailImage
              ? plan.thumbnailImage
              : "https://i.pinimg.com/564x/5d/4c/d7/5d4cd703e53186f7f7e2c2d8963f1244.jpg"
          }
        >
          <UserInfo onClick={onProfile}>
            <img src={plan.userId.profile_img} alt="" />
            <UserName>{plan.userId.nickname}</UserName>
          </UserInfo>
          <CardTitle>{plan.title}</CardTitle>
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
  margin-bottom: 20px;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
`;

const BookMarkCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 152.57px;
  height: 192.65px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
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
  /* display: flex; */
  bottom: 0;
  padding: 0px 16.27px 15.41px;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  color: #ffffff;
  
`;

export default MainUserpick;
