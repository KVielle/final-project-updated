import styled from "styled-components"
import Header from "../Header/Header"
import Button from "./Button"
import Quiz from "./Quiz"
import { useState } from "react"


const HomePage = () => {

    const [selectedGenre, setSelectedGenre] = useState("")

    return (
        <Wrapper>
            <Header />
            <Quiz selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>
            <Button selectedGenre={selectedGenre}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 110vh;
    width: 100vw;
    background-color: #4d0208;
    
`

export default HomePage;