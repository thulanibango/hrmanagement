import React, { useCallback, useReducer } from 'react';

import Input from '../components/UiElements/FormElements/Input';
import Button from '../components/UiElements/FormElements//Button';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../components/UiElements/util/validator';
import { useForm } from '../components/hook/form-hook';
import {useHttpClient} from '../components/hook/http-hook';
import ErrorModal from '../components/UiElements/ErrorModal'
import LoadingSpinner from '../components/UiElements/LoadingSpinner'
import './NewUser.css';


const NewUser = () => {
  const {isLoading, error,sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler]=useForm({
    name: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false);
  

  const userSubmitHandler= async event =>{
    event.preventDefault();
    try {
      sendRequest(`http://localhost:5001/api/users/create`,`POST`,
      JSON.stringify({
        name:formState.inputs.name,
        email:formState.inputs.email,
        password: formState.inputs.password
      })
      
      )
      
    } catch (error) {
      
    }

  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <form className="user-form" onSubmit={userSubmitHandler}>
      {isLoading && < LoadingSpinner asOverlay/>}
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="email"
        element="input"
        type="emai"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter email address"
        onInput={inputHandler}
      />
       <Input
        id="password"
        element="input"
        type="password"
        label="password"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="enter password"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD User
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewUser;
