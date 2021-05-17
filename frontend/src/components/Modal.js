import React from 'react'

const Modal = ({children}) => {
  return (
    <>
    <div className="modal is-flexed">
      {children}
    </div>
    <div className="overlay" onClick={}></div>
    </>
  )
}

export default Modal
