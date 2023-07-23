import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components"
import myLogo from "../../Assets/S.png"
import DropDown from "./DropDown";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {

    const MenuRender = () => {
        
        const { setName, setCurrentUser } = useContext(UserContext);
        const [open, setOpen] = useState(false)
        const { name } = useContext(UserContext);
        

        const handleSignOut = () => {
            console.log("Sign out clicked");
            setName(null);
            setCurrentUser(null);
            localStorage.removeItem("name");
            localStorage.removeItem("user");
        };

        if (name !== null) {
        
            return (
            <Menu>
                <Item to="/profile">{name}</Item>
                <Item to="/home">
                    <Button onClick={handleSignOut}>Sign out</Button>
                </Item>
            </Menu>
            )
        } else {

            return (

            <Menu>
                <Item to = "/">Sign in</Item>
                <Item to = "/signup">Sign up!</Item>
            </Menu>
            
            )
        }
    }

    return (
        <Wrapper>
            <NavLink to="/home">
                <Logo src={myLogo} alt="Logo" />
            </NavLink>
                <Title to = "/home">Shuffle</Title>
            <DropDown />
            <MenuContainer>{MenuRender()}</MenuContainer>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 5em;
    justify-content: center;
    align-items: center;
    background-color: #78000a;
    font-family: 'League Gothic', sans-serif;
    
`
const Logo = styled.img`
    width: 4em;
`
const Title = styled(NavLink)`
    position: absolute;
    color: white;
    font-size: 3.5em;
    text-decoration: none;
    border-bottom: solid white 5px;
    border-radius: 15px;
    padding-left: 0.3em;
    padding-right: 0.3em;
`
const Nav = styled.div`
    
`
const Menu = styled.div`
    @media(max-width: 945px) {
        display: none;
    }
    margin-left: 10em;

`
const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const Button = styled.button`
    font-family: 'League Gothic', sans-serif;
    font-size: 1em;
    background-color: #78000a;
    color: white;
    border: none;
    cursor: pointer;
`
const Item = styled(NavLink)`
    text-decoration: none;
    color: white;
    font-size: 2em;
    margin-top: 1.2em;
    margin-left: 3em;
`
export default Header;