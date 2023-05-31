import React, { useState, useContext } from "react";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../components/UiElements/util/validator";
import Input from "../components/UiElements/FormElements/Input";
import Button from "../components/UiElements/FormElements/Button";
import Card from "../components/UiElements/Card";
import { useForm } from "../components/hook/form-hook";
import { authContext } from "../components/context/auth-context";
import ErrorModal from "../components/UiElements/ErrorModal"
import LoadingSpinner from "../components/UiElements/LoadingSpinner"
import { useHttpClient } from "../components/hook/http-hook";

import "./Authentication.css"
const Authentication = () => {
  const auth = useContext(authContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError }= useHttpClient()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5001/api/users/login', 
         'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {'Content-Type':'application/json'}
        );
        console.log(responseData)
        auth.login();
      } catch (error) {
      }
     
    } else {
      try {
         await sendRequest('http://localhost:5001/api/users/signup', 
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
           {
            'Content-Type': 'application/json'}
          
           
        );

        auth.login();
      } catch (err) {
      }
    }
  };



  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay /> }
      <h2>{isLoginMode ? 'SIGNUP' : 'LOGIN'} </h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            name="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
          
        )}
        <Input
          element="input"
          id="email"
          name="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          name="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 8 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Authentication;
