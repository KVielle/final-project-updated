import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Rating from "./Rating";
import { MdDelete } from "react-icons/md"

const itemColumns = ['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr'];

const WatchLater = () => {

    const [listItems, setListItems] = useState([]);
    const { currentUser } = useContext(UserContext);
    

    useEffect(() => {
        const fetchListItems = async () => {
            try {
            const response = await fetch(`https://shuffle-rq1d.onrender.com/watchlater/${currentUser}`);
            if (response.ok) {
                const { data } = await response.json();
                setListItems(data.listItems);
            } else {
                throw new Error("Request failed with status code " + response.status);
            }
            } catch (error) {
            console.error(error);
            }
        };
        
        fetchListItems();
        }, []);


    const handleDelete = async (movieId) => {
        try {
            const response = await fetch(`https://shuffle-rq1d.onrender.com/watchlater/${currentUser}/delete`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ movieId }),
            });
            if (response.ok) {
            // Remove the deleted movie from the listItems state
            setListItems((prevListItems) => prevListItems.filter((item) => item._id !== movieId));
            } else {
                throw new Error("Request failed with status code " + response.status);
            }
            } catch (error) {
            console.error(error);
            }
    };


    return (
        <Wrapper>
            <Title>Watch later</Title>
            <List>
                <ItemWrapper>
                {listItems.map((item) => (
                    <Item key={item._id}>
                        <img src = {`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt = "Poster"/>
                        <Info><Name>{item.title}{item.name}</Name>
                        <Rating movieId = {item._id}/>
                        <Details>
                            <OverView><div>Overview:</div> {item.overview}</OverView>
                        </Details>
                        <Delete onClick={()=> handleDelete(item._id)}>
                            <MdDelete />
                        </Delete>
                        </Info>
                    </Item>
                ))}
                </ItemWrapper>
            </List>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #4d0208;
    
`
const Title = styled.div`
    color: white;
    font-family: 'League Gothic', sans-serif;
    font-size: 2.2em;
    padding-bottom: 0.5em;
    border-bottom: solid #78000a 10px;
    @media (max-width: 1200px) {
        grid-template-columns: ${itemColumns[0]};
        
    }
`
const Name = styled.div`
    font-size: 1.2em;
    text-align: left;
    font-family: 'League Gothic', sans-serif;
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
`
const List = styled.div`
    color: white;
    
`
const Item = styled.div`
    display: flex;
    border: solid white 5px;
    border-radius: 25px;
    color: white;
    font-family: 'League Gothic', sans-serif;
    width: 30rem;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding: 1.6em;
    background-color: #4d0208;
    box-shadow: 5px 5px 21px 5px #000000;
    position: relative;
    img {
        max-width: 10em;
        max-height: 15em;
        border-radius: 15px;
        margin-right: 1em;
        margin-top: 1em;
        box-shadow:1px 2px 18px 9px #000000;
    }
    @media(max-width: 1075px){
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
        img{
            width: 8em;
        }
    }
`

const ItemWrapper = styled.div`
position: relative;
    display: grid;
    background-color: #4d0208;
    grid-template-columns: ${itemColumns[1]};
    overflow: auto;
    grid-gap: 1em;
    margin-top: 1em;
    @media (min-width: 1620px) {
        grid-template-columns: ${itemColumns[2]};

    }
    @media (max-width: 1070px) {
        grid-template-columns: ${itemColumns[0]};
        grid-gap: 3em;
    
    }
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
    font-size: 2em;
    align-items:center;
    
`
const OverView = styled.div`
    font-size: 0.7em;
    margin-top: 1em;
    text-align: left;
    font-family: 'League Gothic', sans-serif;
    border: 2px solid grey;
    padding: 0.5em;
    border-radius: 20px;
    box-shadow:1px 2px 18px 9px #000000;
    
    div{
        font-size: 1.2em;
        border-bottom: solid 2px white;
        width: 2.5em;
    }
    @media(max-width: 1075px){
        /* border: none; */
        padding: none;
        border-radius: none;
        box-shadow:none;
        /* div{
            display: none;
        } */
    }
`
const Details = styled.div`
    
    
`
const Delete = styled.div`
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 0.3em;
    right: 0.2em;
`
export default WatchLater;