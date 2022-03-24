import React from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as planActions } from "../../../redux/modules/plan";
import { history } from "../../../redux/ConfigureStore";

const Title = (props) => {
    const dispatch = useDispatch();
    return (
        <Container>
            <TitleText>{props.title} <OptionText onClick={(e) => {
    
                dispatch(planActions.createPlan(props.planId));
                history.push("/editplan");
            }}>설정</OptionText></TitleText>
            <DateText>{props.startDate}~{props.endDate}</DateText>
            <DetailText> {props.destination} | {props && props?.withlist} | {props && props?.style}</DetailText>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
box-sizing: border-box;
padding: 0px 24px;

`

const TitleText = styled.div`
margin-top: 22px;
font-size: 22px;
font-weight: 600;
line-height: 25px;

`

const DateText = styled.div`
color: #616161;
font-size: 14px;
font-weight: 400;
line-height: 22px;
margin-top: 6px;
`

const DetailText = styled.div`
color: #616161;
font-size: 14px;
font-weight: 500;
line-height: 22px;
margin-top: 1px;
`
const OptionText = styled.span`
font-size: 14px;
font-weight: 500;
color: #9E9E9E;
cursor: pointer;
:hover {
    color: gray;
}
`

export default Title;