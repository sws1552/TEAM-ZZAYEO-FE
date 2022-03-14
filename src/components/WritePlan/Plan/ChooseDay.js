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
  console.log(dayList)
  const polyLinedata = useSelector((state) => state.map.polyline);
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
              <div
                key={i}
                className={currentTab === i ? "submenu focused" : "submenu"}
                onClick={() => {
                  selectMenuHandler(i)
                  polyLinedata.setMap(null);
                  dispatch(mapActions.addPolyline(polyLinedata));
                  dispatch(mapActions.sendDayId(d.dayId))
                }}
              >
                day{i + 1}
              </div>
            )
          })}
        </TabMenu>

        <Container>
          {dayList && dayList[currentTab].places.map((v, i) => {
            return (
              <>
                <div key= {v} style={{ width: "100%" }}>
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
          <WritePlanModal dayId={dayList && dayList[currentTab].dayId} />
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
  border: 1px solid gray;
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
  justify-items: center;
  align-items: center;
  list-style: none;

  .submenu {
    width:100% auto;
    padding: 15px 10px;
    cursor: pointer;
  }
`;
export default ChooseDay;