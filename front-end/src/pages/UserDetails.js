import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

import ErrorModal from "../components/UiElements/ErrorModal";
import LoadingSpinner from '../components/UiElements/LoadingSpinner';
import UserInfo from "../components/UserInfo";
import { useHttpClient } from "../components/hook/http-hook";


   
const UserDetails = props =>{
    const[loadedUsers,setLoadedUsers]=useState();
    const{isLoading, error, sendRequest, clearError}= useHttpClient();
    const userId = useParams().uid;

   useEffect(()=>{
    const fetchUsers= async()=>{
        try{
            const respData = await sendRequest(`http://localhost:5001/api/users/${userId}`);
            console.log(respData.data);
            setLoadedUsers(respData.data)
        }catch(err){
            // console.log(error)
        }

    }
    fetchUsers();

   }, [sendRequest, userId])
   const placeDeletedHandler = deletedPlaceId => {
    setLoadedUsers(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

    return <React.Fragment>
        
        <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <UserInfo items={loadedUsers} onDeletePlace={placeDeletedHandler} />
      )}

    </React.Fragment> 

}

export default UserDetails;