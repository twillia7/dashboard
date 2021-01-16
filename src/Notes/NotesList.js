import React from 'react'
import NoteItem from './NoteItem'

export default function NotesList({ notes }) {
  return (
    <>
      {notes.notes.map((note, index) => {
        return <NoteItem key={index} title={note.title} description={note.description} text={note.text}/>
      })}
    </>
  )
}