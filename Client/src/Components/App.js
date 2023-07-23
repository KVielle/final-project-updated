import styled from "styled-components"
import GlobalStyles from "./GlobalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom"

import HomePage from "./HomePage/HomePage";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";



function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path = "/home" element = {<HomePage />}/>
          <Route path = "/profile" element = {<Profile />}/>
          <Route path = "/" element = {<SignIn />}/>
          <Route path = "/signup" element = {<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}




export default App;