import React from 'react'
import LoadingSpinner from '../Input/LoadingSpinner'
import { VALIDATOR_REQUIRE } from '../Input/validators'
import { useForm } from '../Input/form-hooks'
import { useHttpClient } from '../Http/http-hook'
import Input from '../Input/Input'
import Modal from '../Modal/Modal'
import './Notes.css'

export default function CreateNoteModal({
  showNewNote,
  setShowNewNote,
  userId
}) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      text: {
        value: '',
        isValid: false
      }
    },
    false
  )
  const closeNewNoteHandler = () => setShowNewNote(false)

  const noteSubmitHandler = async event => {
    event.preventDefault()
    try {
      await sendRequest(
        'http://localhost:5000/notes',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          text: formState.inputs.text.value,
          userId: userId
        }),  
        { 'Content-Type': 'application/json' } 
      )
    } catch (err) {
      console.log(err)
    }
    closeNewNoteHandler()
  }

  return (
    <Modal
      show={showNewNote}
      onCancel={closeNewNoteHandler}
      onSubmit={noteSubmitHandler}
      header='New Note'
      contentClass='place-item__modal-content'
      footerClass='place-item__modal-actions'
    >
      {isLoading && <LoadingSpinner asOverlay />}
      <div className='note-container'>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          label="Description"
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="text"
          element="textarea"
          rows='10'
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <button type="submit" disabled={!formState.isValid}>
          Create Note
        </button>
      </div>
    </Modal>
  )
}