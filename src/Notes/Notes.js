import React, { useState, useReducer, useCallback } from 'react'

import { VALIDATOR_REQUIRE } from '../Input/validators';
import Input from '../Input/Input'
import Modal from '../Modal/Modal'
import NoteItem from './NoteItem'
import './Notes.css'

const TEMP_NOTES = {
  notes: [
    {title: 'Temp Note 1', description: 'Description #1', text: 'Text #1'},
    {title: 'Temp Note 2', description: 'Description #2', text: 'Text #2'},
    {title: 'Temp Note 3', description: 'Description #3', text: 'Text #3'},
    {title: 'Temp Note 4', description: 'Description #4', text: 'Text #4'},
    {title: 'Temp Note 5', description: 'Description #5', text: 'Text #5'},
  ]
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
}

export default function Notes() {
  const [showNewNote, setShowNewNote] = useState(false)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, [])


  const openNewNoteHandler = () => setShowNewNote(true)
  const closeNewNoteHandler = () => setShowNewNote(false)

  const noteSubmitHandler = event => {
    event.preventDefault()
    closeNewNoteHandler()
    console.log(formState.inputs) // send this to the backend!
  };

  return (
    <>
      <Modal
        show={showNewNote}
        onCancel={closeNewNoteHandler}
        onSubmit={noteSubmitHandler}
        header='New Note'
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
      >
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
            onInput={inputHandler}
          />
          <Input
            id="text"
            element="textarea"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
          />
          <button type="submit" disabled={!formState.isValid}>
            ADD PLACE
          </button>
        </div>
      </Modal>
      <div className={'notes'}>
        {TEMP_NOTES.notes.map((note, index) => {
          return <NoteItem key={index} title={note.title} description={note.description} text={note.text}/>
        })}
        <hr></hr>
        <button onClick={openNewNoteHandler}>Add Note</button>
      </div>
    </>
  )
}