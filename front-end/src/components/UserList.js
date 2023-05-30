import React from 'react';

import UserItem from './UserItem';
import Card from './UiElements/Card';

const UserList = props =>{

    if (props.items.length === 0){
        return(
            <div>
                <Card>
                    <h2>No Employees found</h2>
                </Card>
               
            </div>
        ) 
    }

    return (
        <ul className='users-list'>
            {props.items.map(user=>(
                <UserItem 
                key={user.id} 
                id={user.id}
                image={user.image}
                name={user.name}
                />
            ))}
        </ul>
    )


}

export default UserList;