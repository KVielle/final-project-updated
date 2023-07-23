import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { GiHamburgerMenu } from "react-icons/gi"
import { UserContext } from "../UserContext";



const DropDown = () => {

    const { setName, setCurrentUser } = useContext(UserContext);
    const [open, setOpen] = useState(false)
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



    const MenuRender = () => {
        
        const { name } = useContext(UserContext);
        const handleSignOut = () => {
            setName(null);
            setCurrentUser(null);
            };

        if (name !== null) {
        
            return (
                
                <Menu className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <ul>
                <Item to="/profile">{name}</Item>
                <Item>
                    <Button onClick={handleSignOut}>Sign out</Button>
                </Item>
            </ul>
                </Menu>
            )
        } else {

            return (
                <Menu className = {`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <ul>
                        <Item to = "/signup">Sign up!</Item>
                        <Item to = "/">Sign in</Item>
                    </ul>
                </Menu>
            )
        }
    }


    return (
        <Wrapper>
            <Container ref = {menuRef}>
                <Trigger onClick = {() => {setOpen(!open)}}>
                    <GiHamburgerMenu size={35}/>
                </Trigger>
                {MenuRender()}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    right: 2em;
    justify-content: center;
    align-items: center;
    margin-left: 17em;
    z-index: 10;
`
const Container = styled.div`

`
const Trigger = styled.div`
    color: white;
    cursor: pointer;
    @media(min-width: 945px) {
        display: none;
    }
`
const Menu = styled.div`
    position: absolute;
    top: 5em;
    left: 0vw;
    height: 15em;
    width: 100vw;
    background-color: #78000a;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    text-align: center;
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
    @media(min-width: 945px) {
        display: none;
    }
`
const Button = styled.button`
    font-family: 'League Gothic', sans-serif;
    font-size: 1em;
    background-color: #78000a;
    color: white;
    border: none;
`
const Item = styled(NavLink)`
    text-decoration: none;
    color: white;
    font-size: 2.5em;
    margin-top: 1.2em;
`
export default DropDown;