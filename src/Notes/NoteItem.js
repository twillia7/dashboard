import React, { useState } from 'react'

import './NoteItem.css'
import { VALIDATOR_REQUIRE } from '../Input/validators'
import { useForm } from '../Input/form-hooks'
import Input from '../Input/Input'
import Modal from '../Modal/Modal'

export default function NoteItem({
  title,
  description,
  text
}) {
  const [showNote, setShowNote] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: title,
        isValid: true
      },
      description: {
        value: description,
        isValid: true
      },
      text: {
        value: text,
        isValid: true
      }
    }, 
    true
  )

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const enterEditModal = () => {
    toggleEditMode()
  }
  const closeEditModal = () => {
    toggleEditMode()
  }

  const openNoteHandler = () => setShowNote(true)
  const closeNoteHandler = () => setShowNote(false)
  const deleteNoteHandler = () => {
    console.log("DELETING...")
    closeNoteHandler()
  }

  const noteUpdateSubmitHandler = event => {
    event.preventDefault()
    closeNoteHandler()
    console.log(formState.inputs)
  }

  return(
    <>
    {!editMode ? (
      <Modal
        show={showNote}
        onCancel={closeNoteHandler}
        header={
          <>
            <button onClick={enterEditModal}>Edit</button>
            <button onClick={deleteNoteHandler}>Delete</button>
          </>
        }
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
      >
        <div className='note-container'>
          <h2>{title}</h2>
          <h4>{description}</h4>
          <div className='note-content'>
            <p>{text}</p>
          </div>
        </div>
      </Modal>
    ) : (
      <Modal
        show={showNote}
        onCancel={closeNoteHandler}
        header={<button onClick={closeEditModal}>Cancel</button>}
        onSubmit={noteUpdateSubmitHandler}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
      >
        <div className='note-container'>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id='description'
            element='input'
            type='text'
            label='Description'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Input
            id='text'
            element='textarea'
            label='Note Text'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid description.'
            onInput={inputHandler}
            initialValue={formState.inputs.text.value}
            initialValid={formState.inputs.text.isValid}
          />
          <button type="submit" disabled={!formState.isValid}>
            Update Note
          </button>
        </div>
      </Modal>
    )
    }
      <div className={'note-item'} onClick={openNoteHandler}>
        <div className='note-title'>{title}</div>
        <div>{description}</div>
      </div>
    </>
  )
}