import React from 'react';
import styled from 'styled-components'

const Title = (props) => {
    return (
        <Container>
            <h3>{props.title}</h3>
            <div>{props.startDate}~{props.endDate}</div>
            <div> 국내 | ㄷㄷ | 먹방투어 외 3개</div>
        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 165px;
box-sizing: border-box;
border: 3px solid gray;
margin: auto;
overflow: hidden;
padding: 0px 16px;
`

export default Title;