import React from 'react';

import './Avatar.css';

const Avatar = props =>{
    return (
        <div className={`avatar ${props.className}`}>
            < img src={props.image} style={{ width: props.width, height: props.width }}/>
        </div>
    )

}

export default Avatar;