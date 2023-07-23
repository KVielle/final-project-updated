import React, { useContext } from "react";
import { styled } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import Header from "./Header/Header"



const SignIn = () => {
    const navigate = useNavigate();
    const { setName, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    const handleChange = (key, value) => {
    setFormData({
        ...formData,
        [key]: value,
    });
    };

    const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        email: formData.email,
        password: formData.password,
    };
    const newData = JSON.stringify(data);
    fetch("https://shuffle-rq1d.onrender.com/signin", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: newData,
    })
        .then((res) => res.json())
        .then((parse) => {
        if (parse.status === 200) {
            window.alert("Signed in Succesfully!");
            window.localStorage.setItem(
            "user",
            JSON.stringify(parse.data.userId)
            );
            window.localStorage.setItem(
            "name",
            JSON.stringify(parse.data.firstName)
            );
            setName(parse.data.firstName);
            setCurrentUser(parse.data.userId);
            navigate("/home");
        } else if (parse.status === 404){
            window.alert(JSON.stringify(parse.data));
        }
        })
        .catch((error) => {
        window.alert(error);
        });
    }


    return (

        <Wrapper>
            <Header />
            <Box>
                <SignInForm onSubmit={handleSubmit}>
                    <Title>Sign in</Title>
                    <Flex>
                        <FormGroup>
                            <Label htmlFor="email">Email:</Label>
                            <Input
                                type="email"
                                id="email"
                                onChange={(event) =>
                                handleChange(event.target.id, event.target.value)
                                }
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password:</Label>
                            <Input
                                type="password"
                                id="password"
                                onChange={(event) =>
                                handleChange(event.target.id, event.target.value)
                                }
                                />
                        </FormGroup>
                    </Flex>
                    <Signup to="/signup">Don't have an account? <span>Sign up now!</span></Signup>
                    <Button type="submit">Sign In</Button>
                </SignInForm>
        </Box>
    </Wrapper>
    )
};


const Wrapper = styled.div`
    background-color: #4d0208;
    height: 100vh;
    font-family: 'League Gothic', sans-serif;
`
const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: white;
    margin-top: 10em;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    width: 20em;
    box-shadow:1px 2px 18px 9px #000000;
    @media(max-width: 768px){
        width: 15em;
    }
`
const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
    padding-bottom: 1em;
    div {
    margin-bottom: 0.6em;
    }
`
const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
const Title = styled.h2`
    margin-bottom: 1em;
    font-size: 2em;
`
const Label = styled.label`

`
const Input = styled.input`
    margin-left: 1em;
    height: 1.5em;
    border-radius: 15px;
    border:none;
    box-shadow: 1px 2px 25px 2px #000000;
    outline: none;
    padding-left: 0.5em;
`
const FormGroup = styled.div`

`
const Signup = styled(NavLink)`
    color: white;
    margin-bottom: 1em;
    font-size: 0.8em;
    text-decoration: none;
    span{
        text-decoration: underline;
        font-size: 1.2em;
    }
`
const Button = styled.button`
    background-color: #fff;
    justify-content: center;
    font-family: 'League Gothic', sans-serif;
    font-size: 1.2em;
    
    color:red;
    box-shadow: 5px 5px 21px 5px #000000;
    border: 0;
    box-sizing: border-box;
    width: 5em;
    border-radius: 12px;
    cursor: pointer;
    display: inline-flex;
    outline: none;
    padding: 1rem 1.2rem;
    transition-duration: 200ms;
    &:hover{
        transform: scale(1.2);
        transition-duration: 200ms;
    }
`
export default SignIn;