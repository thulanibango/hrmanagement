import React, { useState, useContext } from "react";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../components/UiElements/util/validator";
import Input from "../components/UiElements/FormElements/Input";
import Button from "../components/UiElements/FormElements/Button";
import Card from "../components/UiElements/Card";
import { useForm } from "../components/hook/form-hook";
import { authContext } from "../components/context/auth-context";
import ErrorModal from "../components/UiElements/ErrorModal"
import LoadingSpinner from "../components/UiElements/LoadingSpinner"

import "./Authentication.css"
const Authentication = () => {
  const auth = useContext(authContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  // const authSubmitHandler = async event => {
  //   event.preventDefault();
  //   if (isLoginMode) {
  //   } else {
  //     try {
  //       setIsLoading(true)
  //       const response = await fetch('http://localhost:5001/api/users/signup', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           name: formState.inputs.name.value,
  //           email: formState.inputs.email.value,
  //           password: formState.inputs.password.value
  //         })
  //       });
  //       console.log(formState.inputs)

  //       const responseData = await response.json();
  //       console.log(responseData);
  //       setIsLoading(false);
  //       auth.login();

  //     } catch (err) {
  //       console.log(err);
  //       setError(err.message )
  //     }
  //   }
  //   setIsLoading(false)

  
  // };
  const authSubmitHandler = async event => {
    event.preventDefault();
    
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:5001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5001/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler} />
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay /> }
      <h2>Login Required</h2>
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
          validators={[VALIDATOR_MINLENGTH(8)]}
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
