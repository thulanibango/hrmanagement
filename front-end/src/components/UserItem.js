import React from 'react';

import Avatar from './UiElements/Avatar';
import {Link} from 'react-router-dom';
import Card from './UiElements/Card';
import './UserItem.css';


const UserItem = props =>{
    return (
        <li className='user-item'>
            <Card className="user-item_content">
                <Link to={`/${props.id}/details`}>
                    <div className='user-item_image'>
                        <Avatar image={props.image} alt={props.name}/>
                    </div>
                    <div className='user-item_info'>
                        <h2>{props.name}</h2>
                    </div>
                </Link>
            </Card>
        </li>
    )

}

export default UserItem;