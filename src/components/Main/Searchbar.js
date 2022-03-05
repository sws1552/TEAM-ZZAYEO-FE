import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = (props) => {
  const [search, setSearch] = React.useState(null);
  console.log(search);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(search);
      window.location.replace(`search?query=${search}`);
      //검색시 api 백엔드랑 협의
    }
  };
  return (
    <React.Fragment>
      <Container>
        <SearchIcon className="SearchIcon" />
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

  & .SearchIcon {
    padding-left: 21px;
    font-weight: 200;
    color: #aeaeae;
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
