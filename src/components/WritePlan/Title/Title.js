import React from 'react';
import styled from 'styled-components'

const Title = (props) => {
    return (
        <Container>
            <h2>{props.title}</h2>
            <Text>{props.startDate}~{props.endDate}</Text>
            <Text> {props.destination} | {props && props?.withlist} | {props && props?.style}</Text>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 165px;
box-sizing: border-box;
margin: auto;
overflow: hidden;
padding: 0px 24px;
`
const Text = styled.p`
color: gray;
font-size: 15px;
`
export default Title;