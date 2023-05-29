import React from 'react';

import './Avatar.css';

const Avatar = props =>{
    return (
        <div className='avatar'>
            < img src={props.image} />
        </div>
    )

}

export default Avatar;