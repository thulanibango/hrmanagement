import React from "react";
import {Link} from 'react-router-dom';

import './Landing.css';

const Landing =()=>{
    return(
        <div className="landing-page">
            <h2>Employyee Management</h2>
            <Link to="/authenticate">hello</Link>

        </div>
    )
}

export default Landing;