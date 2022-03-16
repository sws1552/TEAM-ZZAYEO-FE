import React from "react";
import styled from "styled-components";

const Marker = ({ text, Num }) => {
    
    return (
        <Wrapper
            className="marker"
            alt={text}>
            {(Num + 1) % 2 === 0 ?
                <CircleGreen>
                    {Num + 1}
                </CircleGreen> :
                <CirclePurPle>
                    {Num + 1}
                </CirclePurPle>
            }
        </Wrapper>

    )
}

const Wrapper = styled.div`
width: fit-content;
height: fit-content;
transform: translate(-50%, -50%);

`
const CirclePurPle = styled.div`
    background-color: #4E49E2;
    color: white;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    /* width: fit-content; */
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-size: 14px;
    line-height: 25px;
`
const CircleGreen = styled.div`
    background-color: #8CE569;
    color: white;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    /* width: fit-content; */
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-size: 14px;
    line-height: 25px;
`
export default Marker