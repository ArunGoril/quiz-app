import React from 'react'
import OptionCard from './OptionCard'

const OptionComponent = ({questionObject, selectedOption, handleSelectOption}) => {
  return (
    <div className='row justify-content-around my-3'>
      {questionObject.options.map((option, i) => {
        return <OptionCard key={i} option={option} index={i} selectedOption={selectedOption} handleSelectOption={handleSelectOption} />
      })}
    </div>
  )
}

export default OptionComponent