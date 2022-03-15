import React from 'react';
import styled from 'styled-components'

const Title = (props) => {
    return (
        <Container>
            <TitleText>{props.title}</TitleText>
            <DateText>{props.startDate}~{props.endDate}</DateText>
            <DetailText> {props.destination} | {props && props?.withlist} | {props && props?.style}</DetailText>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
box-sizing: border-box;
margin: auto;
overflow: hidden;
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

export default Title;