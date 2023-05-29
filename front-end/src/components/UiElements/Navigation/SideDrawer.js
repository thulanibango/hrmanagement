import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import './SideDrawer.css'

const SideDrawer =props => {
   const content = (
      <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
         <aside className='side-drawer' onClick={props.onClick} >{props.children}</aside>
      </CSSTransition>
   )

//    portal to tells where the content must render, in this case it renders inside the drawer hook
   return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));

}
export default SideDrawer;