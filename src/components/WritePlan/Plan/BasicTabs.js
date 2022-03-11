import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { boxSizing, height } from '@mui/system';
import Image from '../../../elements/Images'

import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../../../redux/modules/map"
import { history } from "../../../redux/ConfigureStore";
import WritePlanModal from "./WritePlanModal"
import EditMenu from "./EditMenu"

const TabPanel = (props) => {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs = (props) => {
  const dayList = props.days

  const polyLinedata = useSelector((state) => state.map.polyline);

  console.log('polyLinedata !! ', polyLinedata);


  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Day
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="basic tabs example" >
          {dayList && dayList.map((d, i) => {
            return (
              <Tab
                disableRipple //퍼지는 듯한 효과차단
                onClick={() => {
                  polyLinedata.setMap(null);
                  polyLinedata.setVisible(false)
                  dispatch(mapActions.sendDayId(d.dayId))
                }} key={i} label={`day${i + 1}`} {...a11yProps(i)} />
            )
          })}
        </Day>
      </Box>
      {dayList && dayList.map((d, i) => {

        return (
          <TabPanel key={i} style={{ height: "100%" }} value={value} index={i} >
            {d.places && d.places.map((v, i) => {
              
              return (
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent:"space-between"}}>
                    <Text>{i + 1}.{v.time}</Text>
                    <EditMenu placeId = {v.placeId}/>
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
              )
            })}

            <WritePlanModal dayId={d.dayId} />
            {/* <Button onClick={() => {
              dispatch(mapActions.sendDayId(d.dayId))
              history.push("/addplace")
            }}>+장소추가하기</Button> */}
          </TabPanel>
        )
      })}
    </Container>
  );
}

const Container = styled(Box)`
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  overflow-y: scroll;
  /* border: 1px solid gray; */
  &::-webkit-scrollbar {
        display: none;
    }
`
const Day = styled(Tabs)`
  width: 100%;
 .css-1aquho2-MuiTabs-indicator {
    background-color: #12C5ED;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: black;
    font-weight: 700;
  }
  .css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root{
    color: gray;
    width: 30px;
  }
`
const Button = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: 32px;
    margin: 20px auto;
    padding: 15px 12px;
    box-sizing: border-box;
    border-radius: 50px;
    font-size: 12px;
    background-color: #eee;
    font-weight: 400;
    cursor: pointer;
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
const Line = styled.div`
 border-left : 3px solid #12C5ED;
 height : 50px !important;
`





export default BasicTabs