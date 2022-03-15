import React, { useState } from 'react';
import styled from 'styled-components';
import { actionCreators as mapActions } from "../../../redux/modules/map"
import { useDispatch, useSelector } from "react-redux";
import EditMenu from "./EditMenu"
import Image from '../../../elements/Images'
import WritePlanModal from "./WritePlanModal"

const ChooseDay = (props) => {
  const dayList = props.days
  const [currentTab, setCurrentTab] = useState(0);

  const polyLinedata = useSelector((state) => state.map.polyline);
  const myPlan = useSelector((state) => state.plan.myPlan);
 
  const startDate = myPlan.startDate
  const endDate= myPlan.endDate
  
  const betweenDay = (startDate, endDate) => {
    var res_day = [];
    var ss_day = new Date(startDate);
    var ee_day = new Date(endDate);
    while (ss_day.getTime() <= ee_day.getTime()) {
      var _mon_ = (ss_day.getMonth() + 1);
      _mon_ = _mon_ < 10 ? '0' + _mon_ : _mon_;
      var _day_ = ss_day.getDate();
      _day_ = _day_ < 10 ? '0' + _day_ : _day_;
      res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' + _day_);
      ss_day.setDate(ss_day.getDate() + 1);
    }
    return res_day;
  }

  const _myDays = betweenDay(startDate, endDate)

  const myDays = _myDays[currentTab]
  const mygetDate = new Date(myDays).getDate()
  const mygetMonth = new Date(myDays).getMonth()+1
  const getDay = new Date(myDays).getDay()
  const getmyDay = ["일", "월", "화", "수", "목", "금", "토"]

  const dispatch = useDispatch()

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <div>
        <TabMenu>
          {dayList && dayList.map((d, i) => {
            return (
              <div>
              <DayButton
                key={i}
                className={currentTab === i ? "submenu focused" : "submenu"}
                onClick={() => {
                  selectMenuHandler(i)
                  polyLinedata.setMap(null);
                  dispatch(mapActions.addPolyline(polyLinedata));
                  dispatch(mapActions.sendDayId(d.dayId))
                }}
                style={{
                  backgroundColor:
                    i === currentTab ? "#4E49E2" : "#F4F4F4",
                  color: i === currentTab ? "#FFFFFF" : "#9E9E9E",
                }}
              >
                day{i + 1}
              </DayButton>
              </div>
            )
          })}
        </TabMenu>
          <TravelDay>
           {`${mygetMonth}.${mygetDate}/${getmyDay[getDay]}`}
          </TravelDay>
        <Container>
          {dayList && dayList[currentTab]?.places.map((v, i) => {
            return (
              <>
                <div key={v} style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>{i + 1}.{v.time}</Text>
                    <EditMenu placeId={v.placeId} />
                  </div>
                  <Text>{v.placeName}</Text>
                  <Address>주소:{v.address}</Address>
                  <MemoBox>
                    <Memo>{v.memoText}</Memo>
                  </MemoBox>
                  {v.memoImage && v.memoImage.map((m, i) => (
                    <Image width="50%" height="50" src={m}></Image>
                  ))}
                </div>
              </>
            )
          })}
          <AddPlaceBox>
          <WritePlanModal dayId={dayList && dayList[currentTab]?.dayId} />
          </AddPlaceBox>
        </Container>
      </div>

    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 255px;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 0px 24px;
  &::-webkit-scrollbar {
        display: none;
    }
`
const Text = styled.div`
font-weight: 800;
font-size: 17px ;
margin-top: 20px;
`

const Address = styled.span`
color: gray;
font-size: 13px;

`

const MemoBox = styled.div`
width: 100%;
height: 95px;
background-color: #f4f4f4;
border-radius: 8px;
box-sizing: border-box;
padding: 10px;
margin-top: 15px;
margin-bottom: 15px;
`

const Memo = styled.div`
color: #666666;
`

const TabMenu = styled.div`
  background-color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding-left: 24px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
        display: none;
    }
  /* .submenu {
    width:100% auto;
    padding: 15px 10px;
    cursor: pointer;
  } */
`;

const TravelDay = styled.div`
  padding: 0px 24px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

`

const AddPlaceBox = styled.div`
  width: 100%;
  height: 41px;
  border: 1px solid #BDBDBD;
  border-radius: 4px;
  margin-top: 22px;
  line-height: 41px;
  text-align: center;
`

const DayButton = styled.div`
  display: flex;
  align-items: center;
  width: fit-content; //글자크기만큼
  height: 32px;
  margin: 22.5px 8px 22px 0px;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 14px;
  background-color: #eee;
  font-weight: 400;
  cursor: pointer;
`
export default ChooseDay;