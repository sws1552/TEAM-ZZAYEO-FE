// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as planActions } from "../../../redux/modules/plan";
// import EditPlanModal from "./EditPlanModal";

// const options = ["게시물 삭제", "게시물 수정"];

// const ITEM_HEIGHT = 48;

// export default function LongMenu(props) {
//   const { placeId } = props;

//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div style={{ marginRight: "-16px" }}>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? "long-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: "10.5ch",
//           },
//         }}
//         style={{
//           left: "-50px",
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem
//             key={option}
//             selected={option === "Pyxis"}
//             onClick={() => {
//               if (option === "게시물 삭제") {
//                 dispatch(planActions.deleteMyPostDB(placeId));
//               }
//             }}
//           >
//             {option === "게시물 삭제" ? (
//               <div>삭제하기</div>
//             ) : (
//               <EditPlanModal placeId={placeId} placesData={props.placesData} />
//             )}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux';
import { actionCreators as planActions } from "../../../redux/modules/plan";
import EditPlanModal from "./EditPlanModal";

const EditMenu = React.memo((props) => {

  const { placeId } = props;
  console.log(props)
  const dispatch = useDispatch();

  const itemClick = (e) => {

    if (e.target.id === "게시물 삭제") {
     
      dispatch(planActions.deleteMyPostDB(placeId));
    }
    showHide();

  }

  const dropdownRef = useRef(null);
  const [isActive5, setIsActive] = useState(false);
  const showHide = () => setIsActive(!isActive5);

  useEffect(() => {

    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive5);
      }
    };

    if (isActive5) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive5]);

  const options = ["게시물 삭제", "게시물 수정"];
  
  console.log('isActive5 !! ',isActive5);
      
  return (
    <Container>
      
      <MoreVertIcon onClick={showHide} className="menu-trigger"/>
      
      <nav ref={dropdownRef} className={`menu5 ${isActive5 ? 'active5' : 'inactive5'}`}>
        <ul>
          {options.map((option) => {
            return (
              <li key={option} id={option} onClick={itemClick}>
                {option}
              </li>
            )
          })}
        </ul>
      </nav>
    </Container>
  );
});

const Container = styled.div`
  position: absolute;
  right: 0;

  .menu5 {
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu5.active5 {
    opacity: 1;
    visibility: visible;
    transform: translateY(-15px);
  }

  .menu5 ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu5 li {
    border-bottom: 1px solid #dddddd;
    text-decoration: none;
    color: #333333;
    padding: 5px;
    display: block;
    text-align: center;
    cursor: pointer;
  }

  .menu5 li:hover {
    background-color: #EEEEEE;
  }
  
  .menu-trigger {
    /* border-radius: 90px; */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border: none;
    vertical-align: middle;
    color: #616161;
  }

  .menu-trigger:hover {
    color: black;
  }

`;



export default EditMenu;