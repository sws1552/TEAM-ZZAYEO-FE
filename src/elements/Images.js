import { goForward } from "connected-react-router";
import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const { width ,src, size, borderRadius, margin, shape } = props;
    const styles = {
        width: width,
        src: src,
        size: size,
        borderRadius: borderRadius,
        margin: margin
    }
    return (
        <AspectOutter {...styles}>
            <AspectInner {...styles}></AspectInner>
        </AspectOutter>
    )
}
Image.defaultProps = {
    src: "",
    size: 12,
    borderRadius: false,
    margin: false,
    width: "100%"
}

//게시판 작성 이미지입니다!
const AspectOutter = styled.div`
    ${(props) => (props.width ? `width: ${props.width};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.marginLeft ? `margin-left: ${props.marginLeft};` : "")}
`

const AspectInner = styled.div`
    padding-top: 75%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    display: block;
`;


export default Image;