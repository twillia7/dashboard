import React, { useState, useContext, useEffect } from 'react'
import NotesList from './NotesList'
import CreateNoteModal from './CreateNoteModal'
import ErrorModal from '../Input/ErrorModal'
import { useHttpClient } from '../Http/http-hook'
import { AuthContext } from '../Authentication/auth-context'
import LoadingSpinner from '../Input/LoadingSpinner'
import './Notes.css'

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
        setNotes(responseData.notes)
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotes()
  }, [])

  const openNewNoteHandler = () => setShowNewNote(true)
  const onNoteDelete = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      <CreateNoteModal showNewNote={showNewNote} setShowNewNote={setShowNewNote} />
      <div className={'notes'}>
        {!isLoading && notes && <NotesList notes={notes} onNoteDelete={onNoteDelete} />}
        <hr></hr>
        <button onClick={openNewNoteHandler}>Add Note</button>
      </div>
    </>
  )
}