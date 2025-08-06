import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0rem auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #ccc;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #6a0dad;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #6a0dad;
`;

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput placeholder="Pesquisar" />
    </SearchContainer>
  );
};

export default SearchBar;
