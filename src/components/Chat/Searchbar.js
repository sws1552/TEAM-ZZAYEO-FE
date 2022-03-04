import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';


const Searchbar = (props) => {
    return (
        <SearchCon>
            <SearchIcon className='searchIcon'/>
            <Sbar />
        </SearchCon>
    );
};

const SearchCon = styled.div`
    background-color: #F5F5F5;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 20px;

    & .searchIcon {
        position: absolute;
        color: #AEAEAE;
        left: 15px;
    }

`;

const Sbar = styled.input`
    margin-left: 50px;
    width: 100%;
    height: 4vh;
    border-radius: 20px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    background-color: #F5F5F5;

    &:focus {
        outline: none;
    }

`;

export default Searchbar;