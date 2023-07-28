import React from 'react'

const QuizResult = ({score, totalScore, tryAgain}) => {
  return (
    <div className='row py-5 align-items-center'>
        <div className='col'>
            <h2>SCORE : {score}/{totalScore}</h2>
            <button className='btn btn-primary' onClick={tryAgain}>Try Again</button>
        </div>
    </div>
  )
}

export default QuizResult