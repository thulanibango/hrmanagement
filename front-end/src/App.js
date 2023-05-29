import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom'

import Users from './pages/Users';
import MainNavigation from './components/UiElements/Navigation/MainNavigation';
import React,{useCallback, useState} from 'react';
import UserDetails from './pages/UserDetails';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import Landing from './pages/Landing';
import Authenication from './pages/Authentication';
import { authContext } from './components/context/auth-context';
const App=()=> {
  const [isLoggedIn, setIsLoggedIn] =useState(false);
  const login = useCallback(()=>{
    setIsLoggedIn(true)

  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false);

  },[])
  let routes;
  if(isLoggedIn){
      routes=(
        <Switch>
          <Route path="/users" exact> 
            <Users/>
          </Route>
          <Route path="/:uid/details" exact>
            <UserDetails />
          </Route>
          <Route path="/newuser" exact>
          <NewUser />
        </Route>
        <Route path="/newuser/:uid" exact>
        <EditUser />
        <Route path="/" exact> 
          <Landing/>
      </Route>
      </Route>
        </Switch>
      ) ;
  }else{
    routes=(
      <Switch>
      <Route path="/" exact> 
          <Landing/>
      </Route>
      <Route path="/authentication" exact>
        <Authenication />
      </Route>
      <Redirect to="/" />
      </Switch>
    );

  }
  return (
  <authContext.Provider value={{isLoggedIn: isLoggedIn, login:login, logout:logout }}>
  <Router>
    <MainNavigation/>
    <main>
    <Switch>
      {routes}
    </Switch>
    </main>
  </Router>
  </authContext.Provider>  
  )
}

export default App;
