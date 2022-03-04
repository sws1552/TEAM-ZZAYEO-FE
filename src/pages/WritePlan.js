import React from 'react';
import styled from 'styled-components';
import WritePlanMap from '../components/WritePlan/Map/WritePlanMap';
import BasicTabs from "../components/WritePlan/Plan/BasicTabs"
import BasicTabsHide from '../components/WritePlan/Plan/BasicTapsHide';
import Header from "../components/WritePlan/Header/Header"
import Title from "../components/WritePlan/Title/Title"

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";


const WritePlan = () => {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.map.list);
    const [show, setShow] = React.useState(true)

    React.useEffect(() => {
        dispatch(mapActions.loadLocationDB(location))
    }, []);

    // <Location>
    // {location.map((v, idx)=>{
    //     return(
    //         <div key={idx}>
    //         <div>이름:{v.name}</div>
    //         <div>경도:{v.lng}</div>
    //         <div>위도:{v.lat}</div>
    //         <div>주소:{v.address}</div>
    //         </div>
    //     )
    // })}
    // </Location>
    return (
        <>
            <Container>
                <Header />
                <Title />
                {show ? <WritePlanMap /> : null}
                <div style={{textAlign:"center"}}>
                    {show ? <button onClick={() => setShow(false)}>MapHide</button> :
                        <button onClick={() => setShow(true)}>MapShow</button>}
                </div>
                {show ? <BasicTabs /> : <BasicTabsHide />}
            </Container>
        </>

    );
};

export default WritePlan;

const Container = styled.div`
/* padding: 24px 24px; */
width: 100%;
`

// const Location = styled.div`
// width: 100%;
// height: 300px;
// box-sizing: border-box;
// border: 5px solid blue;
// margin: auto;
// overflow: hidden;
// `