import React, { useState } from 'react'

import './NoteItem.css'
import Modal from '../Modal/Modal'

export default function NoteItem({
  title,
  description,
  text
}) {
  const [showNote, setShowNote] = useState(false)

  const openNoteHandler = () => setShowNote(true)
  const closeNoteHandler = () => setShowNote(false)

  return(
    <>
      <Modal
        show={showNote}
        onCancel={closeNoteHandler}
        header='View Note'
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
      <div className={'note-item'} onClick={openNoteHandler}>
        <div className='note-title'>{title}</div>
        <div>{description}</div>
      </div>
    </>
  )
}