import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import SignUp from './components/SignUp'
import styled from 'styled-components'

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1{
    margin: 20px;
  }
  .linkDiv{
    margin: 20px;
    .link{
      margin-left: 10px;
      color: black;
      text-decoration: none;
    } 
  }
`

function App() {
  return (
    <div className="App">
      <header >
        <StyledNav>
          <h1>Co-Make</h1>
          <div className='linkDiv'>
            <Link className='link' to='/signup'>Sign Up</Link>
            <Link className='link' to='/'>Home</Link>
          </div>
        </StyledNav>
      </header>
      
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
