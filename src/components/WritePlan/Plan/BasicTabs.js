import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { boxSizing, height } from '@mui/system';
import styled from 'styled-components';
import Detailplan from './Detailplan';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../../../redux/modules/map"
import { history } from "../../../redux/ConfigureStore";

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

  const dispatch = useDispatch()
  // const dayList = useSelector((state) => state.plan.dayList)
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {

  }, [dayList]);



  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Day value={value} onChange={handleChange} aria-label="basic tabs example" >
          {dayList && dayList.map((d, i) => {
            return (
              <Tab onClick={() => {
                // dispatch(mapActions.sendDayId(d.dayId))
              }} key={i} label={`day${i + 1}`} {...a11yProps(i)} />
            )
          })}

        </Day>
      </Box>
      {dayList && dayList.map((d, i) => {
        return (
          <TabPanel key={i} style={{ height: "100%" }} value={value} index={i} >
            {/* <Detailplan/> */}
            <button onClick={() => {
              dispatch(mapActions.sendDayId(d.dayId))
              history.push("/addplace")
            }}>장소추가하기</button>
          </TabPanel>
        )
      })}
    </Container>
  );
}

const Container = styled(Box)`
  width: 100%;
  height: 300px;
  border: 3px solid gray;
  box-sizing: border-box;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
        display: none;
    }
`
const Day = styled(Tabs)`
  width: 100%;
`


export default BasicTabs