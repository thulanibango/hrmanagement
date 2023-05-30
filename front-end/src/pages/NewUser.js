import React, { useCallback, useReducer } from 'react';

import Input from '../components/UiElements/FormElements/Input';
import Button from '../components/UiElements/FormElements//Button';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../components/UiElements/util/validator';
import './NewUser.css';
import { useForm } from '../components/hook/form-hook';


const NewUser = () => {
  const [formState, inputHandler]=useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false);
  

  const userSubmitHandler= event =>{
    event.preventDefault();
    // Send to the Backend
    // console.log(formState)

  }

  return (
    <form className="user-form" onSubmit={userSubmitHandler}>
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
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewUser;
