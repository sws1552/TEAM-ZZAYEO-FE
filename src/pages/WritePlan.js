import React from 'react';
import styled from 'styled-components';
import WritePlanMap from '../components/WritePlan/Map/WritePlanMap';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";

const WritePlan = () => {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.map.list);

   
    React.useEffect(() => {
        dispatch(mapActions.loadLocationDB(location))
    }, []);

    
    return (
        <>
            <Container>
            
                <WritePlanMap />
                <Location>
                {location.map((v, idx)=>{
                    return(
                        <div key={idx}>
                        <div>이름:{v.name}</div>
                        <div>경도:{v.lng}</div>
                        <div>위도:{v.lat}</div>
                        <div>주소:{v.address}</div>
                        </div>
                    )
                })}
                    
                </Location>
            </Container>

        </>

    );
};

export default WritePlan;

const Container = styled.div`
padding: 24px 24px;
`

const Location = styled.div`
width: 100%;
height: 300px;
box-sizing: border-box;
border: 5px solid blue;
margin: auto;
overflow: hidden;
`