import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { PiTelevisionSimpleFill } from "react-icons/pi"

const AddMovieToWatchLater = ({ result, resetActive }) => {

    const [rating, setRating] = useState(0);
    const { currentUser } = useContext(UserContext);
    const [active, setActive] = useState(false);

    
    const handleAddToWatchlist = (event, newRating) => {
        setActive(true)
        event.preventDefault();
        setRating(newRating);

        const requestBody = {
            _id: result.data.id.toString(),
            title: result.data.title,
            vote_average: result.data.vote_average,
            overview: result.data.overview,
            poster_path: result.data.poster_path,
            };

            
        fetch(`https://shuffle-rq1d.onrender.com/add-movie-to-watchlater/${currentUser}`, {
            method: "PATCH",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((parse) => {
            if (parse.status === 200) {
                window.alert("Movie added to the Watch later");
            }
            if (parse.status === 404) {
                window.alert("Please sign in to add movies to your Watch list!")
                setActive(false)
            }
            if (parse.status === 400) {
                window.alert("Please sign in to add movies to your Watch list!")
                setActive(false)
            }
            if (parse.status === 409) {
                window.alert("Please sign in to add movies to your Watch list!")
                setActive(false)
            }
            })
            .catch((error) => {
            window.alert(error);
            });
        };

        useEffect(() => {
            setActive(false);
        }, [result])

    return (
        <Wrapper>
            Add To your Watch list!
            <Trigger onClick={handleAddToWatchlist} active={active}>
                <PiTelevisionSimpleFill size={50} />
            </Trigger>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    height: 1em;
    margin-left: 1em;
    margin-top: 1.5em;
`;

const Trigger = styled.div`
    display: inline-block;
    color: ${(props) => (props.active ? "gold" : "gray")};
    cursor: pointer;
    margin-top: 1em;
`;


export default AddMovieToWatchLater;