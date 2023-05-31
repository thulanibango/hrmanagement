import React,{useEffect,useState,useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import Input from '../components/UiElements/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../components/UiElements/util/validator';
import Button from '../components/UiElements/FormElements/Button';
import { useForm } from '../components/hook/form-hook';
import ErrorModal from '../components/UiElements/ErrorModal';
import LoadingSpinner from '../components/UiElements/LoadingSpinner';
import { authContext } from '../components/context/auth-context';
import { useHttpClient } from '../components/hook/http-hook';
import Card from '../components/UiElements/Card';
import "./NewUser.css";

const EditUser = () =>{
  const auth = useContext(authContext);

const {isLoading, error, sendRequest, clearError}= useHttpClient();
const [loadedUser, setLoadedUser] = useState();
const history = useHistory();

const userId = useParams().uid; 
const [formState,inputHandler,setFormData] = useForm(
    {name:
        {value:"", isValid:true},
         email:{value:"", isValid:true}
    }, false)
    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const responseData = await sendRequest(
                    `http://localhost:5001/api/users/${userId}`)  
                    console.log(responseData.data)
                    setLoadedUser(responseData.data)  
                    setFormData(
                        {name:
                            {value:responseData.user.name, isValid:true},
                            email:{value:responseData.user.email, isValid:true}
                        }, true)
            } catch (error) {
                
            } 
        };
        fetchUser();
    }, [setFormData, userId, sendRequest]);

const userUpdate = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5001/api/users/${userId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/uses');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find User!</h2>
        </Card>
      </div>
    );
  }

// if(!IdentifyUser){
//     return(<div className='center'><h2>Could not find user</h2></div>)
// }
// if(isLoading){
//     return(<div className='center'><h2>Loading...</h2></div>)

// }

    return (
        <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        
    <form className='user-form' onSubmit={userUpdate}>
        <Input 
        id="name"
        element ="input"
        type="text"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText = "Please enter valid name"
        onInput = {inputHandler}
        initialValue={loadedUser.name}
        initialValid={true}
        />
         <Input 
        id="email"
        element ="input"
        type="email"
        label="email"
        validators={[VALIDATOR_EMAIL()]}
        errorText = "Please enter valid email"
        onInput = {inputHandler}
        initialValue={loadedUser.email}
        initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid} >Edit User</Button>

       
        </form>)}
    </React.Fragment>
    )
}

export default EditUser;