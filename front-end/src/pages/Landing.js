import React from "react";
import {Link} from 'react-router-dom';

import './Landing.css';
import Button from "../components/UiElements/FormElements/Button";

const Landing =()=>{
    return(
        <div className="landing-page">
            <h2>Welcome Employee </h2>
            <p>This is your employee Management system</p>
            <Button className="shorter-button" to="/authentication">Click here to continue</Button>

        </div>
    )
}

export default Landing;