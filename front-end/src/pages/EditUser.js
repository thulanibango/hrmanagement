import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import Input from '../components/UiElements/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../components/UiElements/util/validator';
import Button from '../components/UiElements/FormElements/Button';
import { useForm } from '../components/hook/form-hook';
import "./NewUser.css";
const USERS = [{id:'1', name:"Tulani Bango", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",description:"lorem7 ug uygerf uyger uygre ugvr v77eryfg7ygyvruwevuvgurev uveru",email:"hello@je.com", department:"Hr"},{id:'2', name:"Hello Doctor", image:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",description:"lorem7 ug uygerf uyger uygre ugvr v77eryfg7ygyvruwevuvgurev uveru",email:"Mholo@je.com", department:"CsC"}];

const EditUser = () =>{
const [isLoading, setIsLoading] = useState(true);
const userId = useParams().uid; 
const IdentifyUser = USERS.find(user => user.id === userId);
const [formState,inputHandler,setFormData] = useForm(
    {
        name:
        {value:"", isValid:true},
         description:{value:"", isValid:true}
    }, false)
useEffect(()=>{
    setFormData({ name:
        {value:IdentifyUser.name, isValid:true},
         description:{value:IdentifyUser.description, isValid:true}},true);
         setIsLoading(false);
}, [setFormData, IdentifyUser]);



const userUpdate= event =>{
    event.preventDefault();
    console.log(formState.inputs)

}

if(!IdentifyUser){
    return(<div className='center'><h2>Could not find user</h2></div>)
}
if(isLoading){
    return(<div className='center'><h2>Loading...</h2></div>)

}

    return (
        
    <form className='user-form' onSubmit={userUpdate}>
        <Input 
        id="name"
        element ="input"
        type="text"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText = "Please enter valid name"
        onInput = {inputHandler}
        initialValue={formState.inputs.name.value}
        initialValid={formState.inputs.name.isValid}
        />
        <Button type="submit" disabled={!formState.isValid} >Edit User</Button>

       
        </form>)
}

export default EditUser;