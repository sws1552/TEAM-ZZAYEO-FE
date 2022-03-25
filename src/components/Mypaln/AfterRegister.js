import React from "react";
import styled from "styled-components";
import { history } from "../../redux/ConfigureStore";
import MyEditPost from "./MyEditPost";

const AfterRegister = (props) => {

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
        <TripCard src={props.thumbnailImage ? props.thumbnailImage: defaultUrl[imgUrl] }
          onClick={(e) => {
            history.push(`/detail/${props.planId}`);
          }}
        >

          <DivBox>
            <PublicBox>
              {props.status === "공개" ? <><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.33301 9.83301C3.33301 8.72844 4.22844 7.83301 5.33301 7.83301H10.6663C11.7709 7.83301 12.6663 8.72844 12.6663 9.83301V12.4997C12.6663 13.6042 11.7709 14.4997 10.6663 14.4997H5.33301C4.22844 14.4997 3.33301 13.6042 3.33301 12.4997V9.83301ZM5.33301 9.16634C4.96482 9.16634 4.66634 9.46482 4.66634 9.83301V12.4997C4.66634 12.8679 4.96482 13.1663 5.33301 13.1663H10.6663C11.0345 13.1663 11.333 12.8679 11.333 12.4997V9.83301C11.333 9.46482 11.0345 9.16634 10.6663 9.16634H5.33301Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.66699 5.83333C4.66699 3.99238 6.15938 2.5 8.00033 2.5C9.84127 2.5 11.3337 3.99238 11.3337 5.83333V8.5C11.3337 8.86819 11.0352 9.16667 10.667 9.16667C10.2988 9.16667 10.0003 8.86819 10.0003 8.5V5.83333C10.0003 4.72876 9.10489 3.83333 8.00033 3.83333C6.89576 3.83333 6.00033 4.72876 6.00033 5.83333V6.16667C6.00033 6.53486 5.70185 6.83333 5.33366 6.83333C4.96547 6.83333 4.66699 6.53486 4.66699 6.16667V5.83333Z" fill="white" />
              </svg>{props.status}
              </> : <><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.33301 9.83301C3.33301 8.72844 4.22844 7.83301 5.33301 7.83301H10.6663C11.7709 7.83301 12.6663 8.72844 12.6663 9.83301V12.4997C12.6663 13.6042 11.7709 14.4997 10.6663 14.4997H5.33301C4.22844 14.4997 3.33301 13.6042 3.33301 12.4997V9.83301ZM5.33301 9.16634C4.96482 9.16634 4.66634 9.46482 4.66634 9.83301V12.4997C4.66634 12.8679 4.96482 13.1663 5.33301 13.1663H10.6663C11.0345 13.1663 11.333 12.8679 11.333 12.4997V9.83301C11.333 9.46482 11.0345 9.16634 10.6663 9.16634H5.33301Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.66699 5.83333C4.66699 3.99238 6.15938 2.5 8.00033 2.5C9.84127 2.5 11.3337 3.99238 11.3337 5.83333V9.16667H4.66699V5.83333ZM8.00033 3.83333C6.89576 3.83333 6.00033 4.72876 6.00033 5.83333V7.83333H10.0003V5.83333C10.0003 4.72876 9.10489 3.83333 8.00033 3.83333Z" fill="white" />
              </svg>{props.status}
              </>}
            </PublicBox>
            <MyEditPost planId={props.planId} />
          </DivBox>

          <CardInfo>
            <CardTitle>{props.title}</CardTitle>
            <CardDays>
              {props.startDate}~{props.endDate}
            </CardDays>
          </CardInfo>
        </TripCard>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 16px 24px 0px 24px;
`;

const TripCard = styled.div`
  width: 100%;
  height: 128px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
`;
const DivBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PublicBox = styled.div`
  margin: 10px 0px 0px 16px;
  padding: 3px 6px;
  background: rgba(33, 33, 33, 0.5);
  border-radius: 4px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  svg{
    margin-right: 2px
  }
`;

const CardInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 17px;
  bottom: 16px;
`;

const CardTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`;

const CardDays = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
`;

export default AfterRegister;
