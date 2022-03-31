import React from 'react';
import styled from "styled-components"
import { actionCreators as planActions } from "../../redux/modules/plan";
import { useDispatch } from "react-redux";

const GetPlan = (props) => {
    const dispatch = useDispatch();
    return (
        <GetPlanBtn onClick={()=>{
            dispatch(planActions.getyourPostDB(props.planId))
        }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C6.44772 8 6 8.44772 6 9V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V9C18 8.44772 17.5523 8 17 8H16.0833C15.531 8 15.0833 7.55228 15.0833 7C15.0833 6.44772 15.531 6 16.0833 6H17C18.6569 6 20 7.34315 20 9V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V9C4 7.34315 5.34314 6 7 6H7.91667C8.46895 6 8.91667 6.44772 8.91667 7C8.91667 7.55228 8.46895 8 7.91667 8H7Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V4C11 3.44772 11.4477 3 12 3Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.79289 11.2929C9.18342 10.9024 9.81658 10.9024 10.2071 11.2929L12 13.0858L13.7929 11.2929C14.1834 10.9024 14.8166 10.9024 15.2071 11.2929C15.5976 11.6834 15.5976 12.3166 15.2071 12.7071L12.7071 15.2071C12.5196 15.3946 12.2652 15.5 12 15.5C11.7348 15.5 11.4804 15.3946 11.2929 15.2071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929Z" fill="white" />
            </svg>
        </GetPlanBtn>
    );
};

const GetPlanBtn = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 18px;
    cursor: pointer;
  }
`;
export default GetPlan;