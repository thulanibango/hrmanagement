//React imports
import React from 'react';
import ReactDOM from "react-dom";

//personal imports
import {CSSTransition} from 'react-transition-group';
import Backdrop from './Backdrop';
import Avatar from './Avatar';

//css imports
import "./Modal.css"



// Dynamic modal that can be used throughout the application and can be fine tuned down to the class of certain elements
const ModalOvaerlay = props =>{
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
                {/* using Avatar compnent to set the profile picture or any profile picture related demands */}
                <Avatar image={props.image} /> 
            </header>
            <form onSubmit={props.onmSubmit ? props.onSubmit : event=>event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}

const Modal = props => {
    return <React.Fragment>
        {props.show && <Backdrop onClick={props.onCancel}/>}
        <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
            {/* Spread operator, takes the props from Modal and forwards to ModalOvaerlay */}
            <ModalOvaerlay {...props}/>
        </CSSTransition>
    </React.Fragment>

}
export default Modal;