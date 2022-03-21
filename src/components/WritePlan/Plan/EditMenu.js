import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../../../redux/modules/plan"
import EditPlanModal from "./EditPlanModal"

const options = [
    '게시물 삭제',
    '게시물 수정'
];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
    const { placeId } = props;

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ marginRight: "-16px" }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '10.5ch',
                    },
                }}
                style={{
                    left: '-50px',
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option}
                        selected={option === 'Pyxis'}
                        onClick={() => {
                            if (option === "게시물 삭제") {
                                dispatch(planActions.deleteMyPostDB(placeId))
                            }
                        }}>
                        {option === "게시물 삭제" ? <div>삭제하기</div> : <EditPlanModal placeId={placeId} placesData={props.placesData}/>}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
