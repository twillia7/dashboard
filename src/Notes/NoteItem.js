import React, { useState } from 'react'

import { useHttpClient } from '../Http/http-hook'
import { VALIDATOR_REQUIRE } from '../Input/validators'
import { useForm } from '../Input/form-hooks'
import Input from '../Input/Input'
import Modal from '../Modal/Modal'

import './NoteItem.css'

export default function NoteItem({
  title,
  description,
  text,
  noteId,
  onNoteDelete
}) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
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
  const deleteNoteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/notes/${noteId}`,
        'DELETE',
      )
      onNoteDelete(noteId)
    } catch (err) {
      console.log(err)
    }
    closeNoteHandler()
  }

  const noteUpdateSubmitHandler = async event => {
    event.preventDefault()
    try {
      await sendRequest(
        `http://localhost:5000/notes/${noteId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          text: formState.inputs.text.value,
        }),
        {
          'Content-Type': 'application/json'
        }
      )
    } catch (err) {
      console.log(err)
    }
    closeNoteHandler()
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
            <p style={{whiteSpace: 'pre-wrap'}}>{text}</p>
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
            initialValue={title}
            initialValid={true}
          />
          <Input
            id='description'
            element='input'
            type='text'
            label='Description'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={description}
            initialValid={true}
          />
          <Input
            id='text'
            element='textarea'
            label='Note Text'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid description.'
            onInput={inputHandler}
            initialValue={text}
            initialValid={true}
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