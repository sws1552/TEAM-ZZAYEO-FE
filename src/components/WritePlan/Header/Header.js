import React from 'react';
import styled from 'styled-components'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { history } from "../../../redux/ConfigureStore";

const Header = () => {
    return (
        <Container>
            <svg style={{ cursor: "pointer", marginLeft: "350px", display:"block" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" fillOpacity="0.87" />
                onClick={() => {
                    history.push('/myplan')
                }}
            </svg>

 


        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 56px;
box-sizing: border-box;
color: gray;
margin: auto;
overflow: hidden;
padding: 0px 24px;
line-height: 65px;
`
export default Header;