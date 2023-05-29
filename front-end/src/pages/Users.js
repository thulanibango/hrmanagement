import React from "react";
import UserList from "../components/UserList";

const Users = ()=>{
    const USERS = [{id:'1', name:"Tulani Bango", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"},{id:'2', name:"Hello Doctor", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}]
    return <UserList items={USERS} />
}

export default Users;