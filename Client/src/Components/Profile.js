import styled from "styled-components"
import Header from "./Header/Header"
import { useContext } from "react";
import { UserContext } from "./UserContext";
import WatchLater from "./WatchLater";


const Profile = () => {

    const { name } = useContext(UserContext);
    

    return (
        <Wrapper>
            <Header />
            <Box>
                <Title>Hello, {name}</Title>
                <WatchLater />
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #4d0208;
    font-family: 'League Gothic', sans-serif;
`
const Box = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
`
const Title = styled.div`
    color: white;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 3em;
`
export default Profile;