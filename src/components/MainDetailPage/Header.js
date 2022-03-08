import React from 'react';
import styled from 'styled-components'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { history } from "../../redux/ConfigureStore";

const Header = () => {
    return (
        <Container>

            <CancelOutlinedIcon
                style={{ fontSize: "30px", marginLeft: "350px", cursor: "pointer" }}
                onClick={()=>{
                    history.push('/')
                }}
                />
                

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
line-height: 70px;
`
export default Header;