import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { actionCreators as addPlaceActions } from "../../redux/modules/addPlace";
import { useDispatch, useSelector } from "react-redux";

export default function Timedropdown() {
    const dispatch = useDispatch()
    const [Hour, setHour] = React.useState("0" + "시");
    const [Minute, setMinute] = React.useState("00" + "분");
    const [AmPm, setAmPm] = React.useState('');

    const ampmChange = (e) => {
        setAmPm(e.target.value)
    };
    const hourChange = (e) => {
        setHour(e.target.value)
    };
 
    const minuteChange = (e) => {
        setMinute(e.target.value)
    };
 
    const HOUR_SELECT = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    const MINUTE_SELECT = ["00", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
    const AMPM = ["오전", "오후"]


    return (
        <div style={{ margin: "" }}>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                    defaultValue={AmPm}
                    onChange={ampmChange}
                    inputProps={{
                        name: 'time',
                        id: 'uncontrolled-native',
                    }}
                >
                    {AMPM.map((ampm, idx) => {
                        return <option key={idx} value={ampm}>{ampm}</option>
                    })}
                </NativeSelect>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                    defaultValue={Hour}
                    onChange={hourChange}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    {HOUR_SELECT.map((hour, idx) => {
                        return <option key={idx} value={hour}>{hour}시</option>
                    })}
                </NativeSelect>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <NativeSelect
                    defaultValue={Minute}
                    onChange={minuteChange}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    {MINUTE_SELECT.map((minute, idx) => {
                        return <option key={idx} value={minute}>{minute}분</option>
                    })}
                </NativeSelect>
            </FormControl>
        </div>
    );
}