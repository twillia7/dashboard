import React, { useState } from 'react'

import './NoteItem.css'
import Modal from '../Modal/Modal'

export default function NoteItem({
  title,
  description,
  text
}) {
  const [showMap, setShowMap] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)

  return(
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header='Edit Note'
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
      >
        <div className='map-container'>
          <h2>{title}</h2>
          <h4>{description}</h4>
          <p>{text}</p>
        </div>
      </Modal>
      <div className={'note-item'} onClick={openMapHandler}>
        <div className='note-title'>{title}</div>
        <div>{description}</div>
      </div>
    </>
  )
}