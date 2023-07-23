import React from "react";
import styled, { css } from "styled-components"
import { useEffect, useState } from "react";
import AddMovieToWatchLater from "../AddMovieToWatchLater"
import AddTvShowToWatchLater from "../AddTvShowToWatchLater";

const Button = ({ selectedGenre }) => {

    const [result, setResult] = useState([])
    const [selectedOption, setSelectedOption] = useState("movies");


    const handleToggleOption = (option) => {
        setSelectedOption(option);
    };

    const handleClick = () => {
        if (selectedOption === "movies") {
            handleClickMovies();
        } else {
            handleClickTv();
        }
    };

    const handleClickMovies = () => {
        fetch(`https://shuffle-rq1d.onrender.com/movies/${selectedGenre}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((parse) => {
                if (parse.status === 200) {
                    setResult(parse)
                    console.log(parse)
                }
            })
    }

    const handleClickTv = () => {
        fetch(`https://shuffle-rq1d.onrender.com/tv/${selectedGenre}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((parse) => {
                if (parse.status === 200) {
                    setResult(parse)
                    console.log(parse)
                }
            })
    }


    return (
        <Wrapper>
            <ToggleWrapper>
                <ToggleOption
                    active={selectedOption === "movies" ? "true" : "false"}
                    onClick={() => handleToggleOption("movies")}
                >
                Movies
            </ToggleOption>
            <ToggleOption
                active={selectedOption === "tv" ? "true" : "false"}
                onClick={() => handleToggleOption("tv")}
                >
                TV
                </ToggleOption>
            </ToggleWrapper>
            <Picker onClick = {handleClick}>
                Pick for me!
            </Picker>
            {result && result.data && (
                <Result>
                    <Main>
                        <Info>
                            {result.data.poster_path && (<Poster src={`https://image.tmdb.org/t/p/original/${result.data.poster_path}`}/>)}
                            <RatingList>
                                {result.data.vote_average && (
                                    <TMDBRating>TMDB Rating: {result.data.vote_average}/10</TMDBRating>
                                    )}
                                    {selectedOption === "movies" ? (
                                <AddMovieToWatchLater  result={result} />
                                ) : (
                                <AddTvShowToWatchLater  result={result} />
                                )}
                            </RatingList>
                        </Info>
                        <Title>{result.data.title}{result.data.name}</Title>
                    </Main>
                    <Details>
                        <OverView>{result.data.overview}</OverView>
                    </Details>
                </Result>
                )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 20em;
    width: 100vw;
    text-align:center;
    background-color: #4d0208;
`
const ToggleWrapper = styled.div`
    font-family: 'League Gothic', sans-serif;
    font-size: 2em;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
`
const ToggleOption = styled.div`
    ${({ active }) =>
    active === "true"
        ? css`
            color: red;
            font-weight: bold;
            transform: scale(1.2, 1.2);
            transition-duration: 300ms;
        `
    : ''}
    transition-duration: 300ms;
    background-color: #fff;
    box-shadow: 5px 5px 21px 5px #000000;
    border: 0;
    box-sizing: border-box;
    border-radius: 12px;
    cursor: pointer;
    display: inline-flex;
    margin-top: 1em;
    outline: none;
    padding: 1rem 1.2rem;
    z-index: 10;
`
const Picker = styled.button`
    font-family: 'League Gothic', sans-serif;
    font-size: 3.5em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    padding: 0.5em 1em 0.5em 1em;
    border: none;
    border-radius: 30px;
    background-color: #c20211;
    color: white;
    transition-duration: 300ms;
    cursor: pointer;
    &:active{
        transform: scale(0.9, 0.9);
        transition-duration: 300ms;
    }
    
`
const Result = styled.div`
    border: solid white 5px;
    border-radius: 25px;
    color: white;
    font-family: 'League Gothic', sans-serif;
    width: 20rem;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
    padding: 1em;
    height: 100%;
    overflow: auto;
    box-shadow: 5px 5px 21px 5px #000000;
`
const Main = styled.div`
    text-align: center;
    
`
const Info = styled.div`
    display: flex;
    justify-content: center;
`
const Poster = styled.img`
    width: 8em;
    border-radius: 15px;
`
const Title = styled.div`
    font-size: 2em;
    border-bottom: solid white 1px;
    margin-top: 0.2em;
`
const OverView = styled.div`
    font-size: 1.5em;
`
const Details = styled.div`
    display: flex;
    margin-top: 1em;
`
const RatingList = styled.div`

`
const TMDBRating = styled.div`
    font-size: 1.5em;
    margin-left: 1em;
    margin-top: 0.5em;
    height: 1em;
`
export default Button;