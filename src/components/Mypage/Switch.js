import * as React from 'react';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // console.log(event.target.checked);
  };

  return (
    <SwitchRe
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

const SwitchRe = styled(Switch)`

  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked {
    color: #FFFFFF;
  }

  .MuiSwitch-track {
    
  }

`;