import React from 'react';
import styled from 'styled-components';
import WritePlanMap from '../components/WritePlan/Map/WritePlanMap';

const WritePlan = () => {
    return (
        <Container>
            <WritePlanMap/>
        </Container>
    );
};

export default WritePlan;

const Container = styled.div`
padding: 24px 24px;
`