import styled from "styled-components"
import { useState, useEffect, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";



const Quiz = ({ selectedGenre, setSelectedGenre}) => {

    const [open, setOpen] = useState(false)
    const [rotate, setRotate] = useState("");;


    let menuRef = useRef()
    useEffect(() => {
        let handler = (event) => {
            if(!menuRef.current.contains(event.target)){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler)

        return() => {
            document.removeEventListener("mousedown", handler)
        }
    });

    const [genresList, setGenresList] = useState([])
    const [genrePick, setGenrePick] = useState("")

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://shuffle-rq1d.onrender.com/genres`);
                const parsed = await response.json();
                setGenresList(parsed.data.genres);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGenres();
    }, []);

    const handleItemClick = (genreId) => {
        const selectedGenre = genresList.find((genre) => genre.id === genreId)?.name;
        const genrePick = genresList.find((genre) => genre.id === genreId)?.name;
        setSelectedGenre(selectedGenre);
        setGenrePick(genrePick)
        setOpen(false);
    };

    const handleTriggerClick = () => {
        setOpen(!open);
        setRotate(!rotate);
    };
    return (
        <Wrapper>
            <Form>
                <Flex>
                    <Group ref = {menuRef}>
                        <Label>What genre do you like?</Label>
                        <Selected>{genrePick}</Selected>
                        <Trigger onClick={handleTriggerClick} rotate={rotate}>
                            <AiOutlineArrowRight size= {30}/>
                        </Trigger>
                        <Menu className = {`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        {genresList.length > 1 &&
                        genresList.map((genre) => (
                            <Item key={genre.id} onClick={() => handleItemClick(genre.id)}>
                                {genre.name}
                            </Item>
                        ))}
                        </Menu>
                    </Group>
                    <Group2>
                            What do you want to see?
                    </Group2>
                </Flex>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    
    font-family: 'League Gothic', sans-serif;
`
const Form = styled.form`
    color: white;
    font-size: 2em;
`
const Flex = styled.div`
    display: flex;
    flex-direction: column;
    border: solid white 4px;
`;
const Label = styled.label`
    text-align: center;
`
const Group = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    align-items: center;
`
const Trigger = styled.div`
    color: white;
    cursor: pointer;
    margin-top: 0.5em;
    transition: transform 0.3s;
    transform: rotate(${({ rotate }) => (rotate ? '90deg' : '0deg')});
`
const Menu = styled.div`
    position: absolute;
    top: 7em;
    background-color: #78000a;
    border-radius: 25px;
    text-align: center;
    width: 540px;
    z-index: 10;
    transition: 500ms;
    ul{
        display:flex;
        flex-direction: column;
        height: 15em;
    }
    &:active {
        opacity: 1;
        visibility: visible;
    }
    &.inactive {
        opacity: 0;
        visibility: hidden;
        transition: 500ms;
    }
    @media(max-width: 768px){
        width: 98vw;
    }
`
const Item = styled.div`
    margin-bottom: 0.1em;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    margin-left: 2em;
    margin-right: 2em;
    cursor: pointer;
`
const Selected = styled.div`
    color: white;
    margin-top: 0.2em;
    border-bottom: solid white 1px;
    
`
const Group2 = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    align-items: center;
`
export default Quiz;