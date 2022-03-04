import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { boxSizing, height } from '@mui/system';
import styled from 'styled-components';
import Detailplan from './Detailplan';

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

const BasicTabsHide = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Day value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Day 1" {...a11yProps(0)} />
          <Tab label="Day 2" {...a11yProps(1)} />
          <Tab label="Day 3" {...a11yProps(2)} />
          <Tab label="Day 4" {...a11yProps(3)} />
          <Tab label="Day 5" {...a11yProps(4)} />
        </Day>
      </Box>
      <TabPanel style={{height:"100%"}} value={value} index={0}>
        <Detailplan/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item five
      </TabPanel>
    </Container>
  );
}

const Container = styled(Box)`
  width: 100%;
  height: 600px;
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


export default BasicTabsHide