import React,{useEffect, useState} from "react";

import LoadingSpinner from "../components/UiElements/ErrorModal";
import ErrorModal from "../components/UiElements/ErrorModal";
import UserList from "../components/UserList"

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();
  //Load users everytime the page is loaded
    useEffect(() => {
      const sendRequest = async () => {
        //loading whilst fetching data
        setIsLoading(true);
        try {
          // Fetch users on the backend
          const response = await fetch('http://localhost:5001/api/users');
  
          const responseData = await response.json();
        //check for errors response from backend
          if (!response.ok) {
            throw new Error(responseData.message);
          }
         //response from backend
          setLoadedUsers(responseData.users);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      };
      sendRequest();
    }, []);
  
    const errorHandler = () => {
      setError(null);
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
      </React.Fragment>
    );
  };

export default Users;