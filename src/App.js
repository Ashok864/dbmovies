import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";
import MovieInfoComponent from "./Components/MovieInfoComponent";

export const API_KEY = '34ffcbb3';

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color: white;
align-items:center;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;

const MovieImage = styled.img`
width:48px;
height:48px;
marging:15px;
`;

const SearchBox = styled.div`
display: flex;
align-items: center;
flex-direction: row;
padding: 10px 10px;
background-color: white;
width:50%;
border-radius: 6px;
margin-left: 20px;
`;

const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;

const SearchInput = styled.input`
color: black;
font-size:16px;
font-weight: bold;
margin-left: 15px;
border:none;
outline:none;
`;

const MovielistContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding:30px;
justify-content: space-evenly;
gap: 24px;
`;

const PlaceholderImage = styled.img`
width:120px;
height:120px;
margin:150px;
opacity:50%;
`;

function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeOutId] = useState();
  const [movieList, updateMovieList] = useState([])
  const [selectMovie, setSelectMovie] = useState();

  const fetchData = async (searchString) => {
   const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
   updateMovieList(response.data.Search);
   console.log("response: ", response);
   console.log("response movieList: ", response.data.Search);
  }

  const OnTextChange = (event) => {
    clearTimeout(timeoutId);     // using error debounce
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => {
      fetchData(event.target.value)
    }, 500);
    updateTimeOutId(timeout);
    console.log("updateSearchQuery :", searchQuery);
  }

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          Task B
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder="Search movies" value={searchQuery} onChange={OnTextChange} />
        </SearchBox>
      </Header>
      {selectMovie && <MovieInfoComponent selectMovie={selectMovie} onMovieSelect={setSelectMovie} />}
      <MovielistContainer>
        {movieList?.length ? movieList.map((movie,index) => <MovieComponent key={index} movie={movie} onMovieSelect={setSelectMovie} />) : (<PlaceholderImage src="/movie-icon.svg" />)}
        
      </MovielistContainer>
    </Container>
  );
}

export default App;
