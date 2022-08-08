import React from 'react'

const Button = (props) => {
  return (
    <>
      <button
        className="calculator__number"
        name={props.name}
        onClick={props.handleclick}
      >
        {props.number}
      </button>
    </>
  )
}

export default Button
