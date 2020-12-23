import React from 'react';

import './NoteItem.css'

export default function NoteItem({
  title,
  description,
  text
}) {
  return(
    <div className={'note-item'}>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  )
}