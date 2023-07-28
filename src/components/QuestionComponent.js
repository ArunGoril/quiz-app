import React from 'react'

const QuestionComponent = ({questionObject, questionNo, score}) => {
  return (
    <div className='p-3'>
      {/* <p>Score: {score}</p> */}
      <h2 className='question-color'>Q{questionNo}</h2>
      <h4>{questionObject.question}</h4>
    </div>
  )
}

export default QuestionComponent