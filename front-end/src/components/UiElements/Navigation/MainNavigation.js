import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../Backdrop'
import './MainNavigation.css';

const MainNavigation = props => {
  const [draweropen,setDraweropen] = useState(false);
  const openDrawerHandler=()=>{
    setDraweropen(true)
  }
  const closeDrawerHandler=()=>{
    setDraweropen(false);
  }
  return <React.Fragment>
    {/* ternary expression to check if drawer is open */}
    {draweropen && <Backdrop onClick={closeDrawerHandler}/>}
    <SideDrawer show={draweropen} onClick={closeDrawerHandler}>
      <nav className='main-navigation__drawer'>
        <NavLinks/>
      </nav>
    </SideDrawer> 
    <MainHeader>
      <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Employee Management</Link>
      </h1>
      <nav className='main-navigation__header-nav'>
        <NavLinks/>
      </nav>
    </MainHeader>
    </React.Fragment>
  
};

export default MainNavigation;