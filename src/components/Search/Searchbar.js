import React from "react";
import styled from "styled-components";

const Searchbar = (props) => {
  const [search, setSearch] = React.useState(null);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(search);
      window.location.replace(`search?query=${search}`);
    }
  };
  return (
    <React.Fragment>
      <Container>
        <svg
          className="searchIcon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
            stroke="#AEAEAE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="도시나 해시태그를 검색해보세요."
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  margin: 24px;
  width: auto;
  height: 41px;
  background-color: #f4f4f4;
  border-radius: 20.5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  & .searchIcon {
    padding-left: 21px;
    padding-right: 10px;
  }

  input {
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 20.27px;
    color: #767676;

    :focus {
      outline: none;
    }
  }
`;

export default Searchbar;
