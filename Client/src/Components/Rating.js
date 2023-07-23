import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";


const Rating = ({ movieId }) => {

    const [rating, setRating] = useState(0);
    const { currentUser } = useContext(UserContext);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
      // Fetch the current user rating for the movie from the server
      const fetchUserRating = async () => {
        try {
          const response = await fetch(`https://shuffle-rq1d.onrender.com/getUserRating/${currentUser}/${movieId}`);
          if (response.ok) {
            const data = await response.json();
            setUserRating(data.userRating);
          } else {
            throw new Error("Request failed with status code " + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserRating();
    }, [currentUser, movieId]);


    const handleStarClick = async (star) => {
        setRating(star);
      
        try {
          const response = await fetch(`https://shuffle-rq1d.onrender.com/add-rating/${currentUser}/${movieId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: star }), // Include the rating in the request body
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data); // Handle response data
          } else {
            throw new Error("Request failed with status code " + response.status);
          }
        } catch (error) {
          console.error(error); // Handle error
        }
      };

      useEffect(() => {
        // Update the userRating when the rating state changes
        setUserRating(rating);
      }, [rating]);

    return (
        <Wrapper>
            <RatingStars>
                {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    active={star <= userRating}
                    onClick={() => handleStarClick(star)}
                >
                ★
                </Star>
                ))}
            </RatingStars>
            <RatingValue>{userRating}</RatingValue>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8em;
    margin-top: 0.3em;
    margin-left: 0.5em;
    width: 5em;
    border: 2px solid grey;
    padding: 0.3em;
    border-radius: 20px;
    box-shadow:1px 2px 18px 9px #000000;
    @media(max-width: 1200px){
        border: none;
        padding: none;
        border-radius: none;
        box-shadow:none;
    }
`;

const RatingStars = styled.div`
    display: inline-block;
`;

const Star = styled.span`
    color: ${(props) => (props.active ? "gold" : "gray")};
    cursor: pointer;
`;

const RatingValue = styled.span`
    margin-left: 0.5em;
`;

export default Rating;