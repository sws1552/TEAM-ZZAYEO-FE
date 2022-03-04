import React from 'react';
import styled from 'styled-components'

const Title = () => {
    return (
        <Container>
            <h3>힐링을 위한 제주도 여행</h3>
            <div>2002.3.9~3.15</div>
            <div>국내 | 친구와 | 먹방투어 외 3개</div>
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