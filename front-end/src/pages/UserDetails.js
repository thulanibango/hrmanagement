import React from "react";
import {useParams} from 'react-router-dom';

import UserInfo from "../components/UserInfo";
const USERS = [{id:'1', name:"Tulani Bango", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",description:"lorem7 ug uygerf uyger uygre ugvr v77eryfg7ygyvruwevuvgurev uveru",email:"hello@je.com", department:"Hr"},{id:'2', name:"Hello Doctor", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",description:"lorem7 ug uygerf uyger uygre ugvr v77eryfg7ygyvruwevuvgurev uveru",email:"Mholo@je.com", department:"CsC"}]

    const UserDetails = props=>{
   const userId = useParams().uid;
   const loadUser = USERS.filter(user => user.id === userId)

    return <UserInfo items={loadUser}/>

}

export default UserDetails;