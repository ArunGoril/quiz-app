import React from 'react'

const OptionCard = ({option, index, selectedOption, handleSelectOption, buttonClicked, isCorrect}) => {
  let bgColor = ""
  if(buttonClicked) {
    if(selectedOption===index+1) {
      if(isCorrect) {
        bgColor="bg-success"
      } else {
        bgColor="bg-danger"
      }
    }
  }
  return (
    <div className={`col-2 card-bg ${selectedOption===index+1?"checked":null} ${bgColor}`} role="button" onClick={()=>handleSelectOption(index+1)}>
      <div className='row optionContainer align-items-center justify-content-center'>
        <div className='col'>
          <p>{option}</p>
        </div>
      </div>
    </div>
  )
}

export default OptionCard