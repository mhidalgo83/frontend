import React, { useState } from 'react';
import Form from './components/SignIn/form.jsx';
import Users from './components/SignIn/users.jsx';
import IssueForm from './components/PostIssue/issueForm.jsx';
import Issues from './components/PostIssue/issues'


import './App.css';
import { Route, Switch, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from './components/SignUp/SignUp'
import styled from 'styled-components'


const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Quicksand', sans-serif;
  h1{
    margin: 10px;
    font-size:2.5rem;
    font-family: 'Rock Salt', cursive;
    width:20%
    
  }
  .linkDiv{
    margin: 10px;
    width:30%;
    .link{
      padding:2%;
      margin-left: 10px;
      color: white;
      text-decoration: none;
      font-size:1.2rem;

       &:hover{
        color: black;
		    
       }
      
      
    } 
  }
`

function App() {

  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  
  

  return (
  
    <div className="App">
      <header >
        <StyledNav>
          <h1>Co-Make</h1>
          <div className='linkDiv'>
            <Link className='link' to='/postissue'>Post New Issue</Link>
            <Link className='link' to='/signin'>Sign In</Link>
            <Link className='link' to='/signup'>Sign Up</Link>
            <Link className='link' to='/'>Home</Link>
          </div>
        </StyledNav>
      </header>

      <Switch>
        <Route path='/postissue'>
          <IssueForm setIssues={setIssues} issues={issues} />
          <Issues issues={issues}  />
       
          
          
        </Route>

        <Route path='/signin'>
          <Form setUsers={setUsers} users={users} />
          <Users users={users} />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
   
  );
}

export default App;
