import { goForward } from "connected-react-router";
import React from "react";
import styled from "styled-components";

const Image = (props)=>{
    const {src, size, borderRadius, margin, shape} = props;
    const styles ={
        src: src,
        size: size,
        borderRadius:borderRadius,
        margin: margin
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter {...styles}>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }
    return (
        <React.Fragment>
            <Images {...styles}/>
        </React.Fragment>
    )
}
Image.defaultProps = {
    shape: "rectangle",
    src:"",
    size: 12,
    borderRadius : false,
    margin: false,
}

//게시판 작성 이미지입니다!
const AspectOutter = styled.div`
    ${(props) => (props.width ? `width: ${props.width};` : "")}
    max-height: 100%;
    display: flex;
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.marginLeft ? `margin-left: ${props.marginLeft};` : "")}
`

const AspectInner = styled.div`
    padding-top: 75%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    display: block;
`;


const Images =styled.div`
    --size: ${(props)=>props.size}vh;
    width: 100%;
    height: var(--size);
    ${(props)=>props.borderRadius?`border-radius:${props.borderRadius}` :""};
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    margin: ${(props)=>props.margin};
`

export default Image;