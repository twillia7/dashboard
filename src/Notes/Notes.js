import React from 'react'

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

export default function Notes() {
  

  return (
    <div className={'notes'}>
      {TEMP_NOTES.notes.map((note, index) => {
        return <NoteItem key={index} title={note.title} description={note.description} text={note.text}/>
      })}
      <hr></hr>
      END OF NOTES
    </div>
  )
}