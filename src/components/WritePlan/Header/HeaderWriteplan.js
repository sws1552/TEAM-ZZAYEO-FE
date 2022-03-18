import { display } from '@mui/system';
import React from 'react';
import styled from 'styled-components'
import { history } from "../../../redux/ConfigureStore";
import { actionCreators as planActions } from "../../../redux/modules/plan";
import { useDispatch, useSelector } from "react-redux";

const HeaderWritePlan = (props) => {
    console.log(props.planId)
    const dispatch = useDispatch();
    return (
        <Container>
            <HeaderBox>
                <div onClick={() => {
                    dispatch(planActions.deleteMyPlanDB(props.planId));
                }}>
                    <svg style={{ cursor: "pointer", display: "block" }}
                        width="24" height="24"
                        viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                            fill="black"
                            fillOpacity="0.87" />
                    </svg>
                </div>

            </HeaderBox>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 56px;
box-sizing: border-box;
overflow: hidden;
padding: 16px 16px;
line-height: 65px;
`
const HeaderBox = styled.div`
display: flex;
justify-content: flex-end;

`


export default HeaderWritePlan;