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
    /* background-color: red; */
    display: flex;
    position: relative;
    align-items: center;

    & .searchIcon {
        position: absolute;
        color: #AEAEAE;
        left: 15px;
    }

`;

const Sbar = styled.input`
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