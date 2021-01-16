import React, { useState, useContext } from 'react'

import Input from '../Input/Input'
import { useForm } from '../Input/form-hooks'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../Input/validators'
import { AuthContext } from '../Authentication/auth-context'
import { useHttpClient } from '../Http/http-hook'
import './Auth.css'
import ErrorModal from '../Input/ErrorModal'
import LoadingSpinner from '../Input/LoadingSpinner'

export default function Auth() {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)

  const authSubmitHandler = async event => {
    event.preventDefault()

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )

        auth.login(responseData.user.id)
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )

        auth.login(responseData.user.id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        }, false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name'
            onInput={inputHandler}
          />
        )}
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid password. (5 chars)'
          onInput={inputHandler}
        />
        <button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
      </form>
      <button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOG IN'}
      </button>
    </>
  )
}