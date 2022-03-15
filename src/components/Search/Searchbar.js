import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as planActions } from "../../redux/modules/plan";
import { history } from "../../redux/ConfigureStore";
import { useLocation } from "react-router";

const Searchbar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = React.useState(null);

  const query = location.search;

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      history.push({
        pathname: "/search",
        search: `?query=${search}`,
        data: search,
      });
      dispatch(planActions.searchDB(query));
    }
  };
  return (
    <Container>
      <BackCon
        onClick={() => {
          history.push("/");
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.29289 12.7073C2.90237 12.3168 2.90237 11.6836 3.29289 11.2931L9.65685 4.92912C10.0474 4.5386 10.6805 4.5386 11.0711 4.92912C11.4616 5.31965 11.4616 5.95281 11.0711 6.34334L6.41421 11.0002H20C20.5523 11.0002 21 11.4479 21 12.0002C21 12.5525 20.5523 13.0002 20 13.0002H6.41421L11.0711 17.657C11.4616 18.0476 11.4616 18.6807 11.0711 19.0713C10.6805 19.4618 10.0474 19.4618 9.65685 19.0713L3.29289 12.7073Z"
            fill="#212121"
          />
        </svg>
      </BackCon>

      <SearchInput>
        <input
          type="search"
          placeholder="도시를 검색해보세요."
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SearchCon
          onClick={() => {
            history.push({
              pathname: "/search",
              search: `?query=${search}`,
              data: search,
            });
            dispatch(planActions.searchDB(query));
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8525 9.52962C11.5742 8.53916 12 7.3193 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C7.3193 12 8.53916 11.5742 9.52962 10.8525L13.0157 14.3386C13.381 14.7039 13.9733 14.7039 14.3386 14.3386C14.7039 13.9733 14.7039 13.381 14.3386 13.0157L10.8525 9.52962ZM10.1538 6C10.1538 8.29411 8.29411 10.1538 6 10.1538C3.70589 10.1538 1.84615 8.29411 1.84615 6C1.84615 3.70589 3.70589 1.84615 6 1.84615C8.29411 1.84615 10.1538 3.70589 10.1538 6Z"
              fill="#BDBDBD"
            />
          </svg>
        </SearchCon>
      </SearchInput>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 16px;
  width: auto;
  height: 41px;
`;

const BackCon = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

const SearchInput = styled.div`
  width: 100%;
  height: 40px;
  margin: 8px 0px;
  padding: 10px 16px;
  background-color: #f4f4f4;
  border-radius: 22px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  input {
    position: absolute;
    width: 90%;
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

const SearchCon = styled.div`
  position: absolute;
  right: 32px;
`;

export default Searchbar;
