import React, { useState, useContext, useEffect } from 'react'
import ErrorModal from '../Input/ErrorModal'
import NotesList from './NotesList'
import CreateNoteModal from './CreateNoteModal'
import { useHttpClient } from '../Http/http-hook'
import { AuthContext } from '../Authentication/auth-context'
import './Notes.css'
import LoadingSpinner from '../Input/LoadingSpinner'

export default function Notes() {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [showNewNote, setShowNewNote] = useState(false)
  const [notes, setNotes] = useState()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/notes/user/${auth.userId}`
        )
        setNotes(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotes()
  }, [])

  const openNewNoteHandler = () => setShowNewNote(true)

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      <CreateNoteModal showNewNote={showNewNote} setShowNewNote={setShowNewNote} userId={auth.id} />
      <div className={'notes'}>
        {!isLoading && notes && <NotesList notes={notes} />}
        <hr></hr>
        <button onClick={openNewNoteHandler}>Add Note</button>
      </div>
    </>
  )
}