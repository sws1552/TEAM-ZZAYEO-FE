import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux';
import { actionCreators as planActions } from "../../../redux/modules/plan";
import EditPlanModal from "./EditPlanModal";

const EditMenu = (props) => {
  
  const { placeId } = props;
  const planId = props.placesData.planId

  const dispatch = useDispatch();

  const itemClick = (e) => {

    if (e.target.id === "게시물 삭제") {
      dispatch(planActions.deleteMyPostDB(placeId, planId));
    }
    showHide();

  }

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const showHide = () => setIsActive(!isActive);

  useEffect(() => {

    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive]);

  const options = ["게시물 삭제", "게시물 수정"];
      
  return (
    <Container>
      
      <MoreVertIcon onClick={showHide} className="menu-trigger"/>
      
      <nav className={`menu ${isActive ? 'active5' : 'inactive'}`}>
        <ul>
          {options.map((option) => {
            return (
              <li key={option} id={option} onClick={itemClick}>
                {option === "게시물 수정" ? <EditPlanModal placeId={placeId} placesData={props.placesData} /> : "삭제하기"}
              </li>
            )
          })}
        </ul>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin-right: -14px;

  .menu {
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

  .menu.active5 {
    opacity: 1;
    visibility: visible;
    transform: translateY(-15px);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    border-bottom: 1px solid #dddddd;
    text-decoration: none;
    color: #333333;
    padding: 5px;
    display: block;
    text-align: center;
    cursor: pointer;
  }

  .menu li:hover {
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