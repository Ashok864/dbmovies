import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';

const Container = styled.div`
display: flex;
flex-direction: row;
padding: 20px 30px;
justify-content: center;
border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
height: 352px;
object-fit: cover;
`;

const InfoColumn = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
`;

const MovieName = styled.span`
font-size: 18px;
font-weight: 600;
color: black;
margin: 15px 0;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`;

const MovieInfo = styled.span`
font-size: 16px;
font-weight: 500;
color: black;
margin:4px 0;
text-transform: capitalize;
overflow: hidden;
text-overflow: ellipsis;
& span {
    opacity: 0.5;
}
`;

const Close = styled.span`
font-size:16px;
font-weight:600;
color: black;
background: lightgray;
padding:8px;
border-radius: 50%;
cursor: pointer;
height: fit-content;
opacity: 0.8;
`;

const Loading = styled.div`
font-size:20px;
font-weight:600;
opacity:0.7;
`;

const MovieInfoComponent = (props) => {

    const [movieInfo, setMovieInfo] = useState();
    const { selectMovie } = props;

    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?i=${selectMovie}&apikey=${API_KEY}`)
            .then((response) => setMovieInfo(response.data))  //console.log("movieinfo: ",response.data)
    }, [selectMovie])

    return (
        <Container>
            {movieInfo ?
                <>
                    <CoverImage src={movieInfo?.Poster} />
                    <InfoColumn>
                        <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
                        <MovieInfo>Imdb rating: <span>9.0</span></MovieInfo>
                        <MovieInfo>Year: <span>{movieInfo?.Year}</span></MovieInfo>
                        <MovieInfo>Language: <span>{movieInfo?.Language}</span></MovieInfo>
                        <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
                        <MovieInfo>Released: <span>{movieInfo?.Released}</span></MovieInfo>
                        <MovieInfo>Runtime: <span>{movieInfo?.Runtime}</span></MovieInfo>
                        <MovieInfo>Genre: <span>{movieInfo?.Genre}</span></MovieInfo>
                        <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
                        <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
                        <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
                    </InfoColumn>
                    <Close onClick={() => { props.onMovieSelect() }}>X</Close>

                </> : <Loading>Loading ...</Loading>}

        </Container>
    )
}

export default MovieInfoComponent;