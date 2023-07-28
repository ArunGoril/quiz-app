import React, { useState } from 'react'
import { QuizData } from '../data/QuizData'
import OptionComponent from './OptionComponent'
import QuestionComponent from './QuestionComponent'
import QuizResult from './QuizResult'
import WheelButton from './WheelButton'

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(2)
    const [score, setScore] = useState(0)
    const [selectedOption, setSelectedOption] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [knobRotation, setKnobRotation] = useState(0);

    const handleSelectOption = (optionNo) => {
        setSelectedOption(optionNo);
        const rotationValue = 20 * optionNo - 50; // Assuming each option is separated by 90 degrees
        setKnobRotation(rotationValue);
      };

    const changeQuestionHandler = () => {
        if (selectedOption === 0) {
            alert("Please select a option")
            return
        }
        updateScore()
        if (currentQuestion < QuizData.length) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1)
            setSelectedOption(0)
        } else {
            setShowResult(true)
        }
    }

    const skipQuestionHandler = () => {
        if (currentQuestion < QuizData.length) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1)
            setSelectedOption(0)
        } else {
            setShowResult(true)
        }
    }

    const updateScore = () => {
        if (selectedOption === QuizData[currentQuestion - 1].answer) {
            setScore(prevScore => prevScore + 10)
        }
    }

    const resetAll = () => {
        setCurrentQuestion(1)
        setScore(0)
        setSelectedOption(0)
        setShowResult(false)
    }

    const handleClick = (selectedOption) => {
        alert(`Selected Option: ${selectedOption}`);
    };

    return (
        <div>
            {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length * 10} tryAgain={resetAll} />
            ) : (
                <>
                    <div className='row-reverse quiz-container'>
                        <div className='col'>
                            <QuestionComponent questionObject={QuizData[currentQuestion - 1]} questionNo={currentQuestion} score={score} />
                            <OptionComponent questionObject={QuizData[currentQuestion - 1]} selectedOption={selectedOption} handleSelectOption={handleSelectOption} />
                        </div>
                        <div className='col wheel-container'>
                            <WheelButton options knobRotation={knobRotation} changeQuestionHandler={changeQuestionHandler} />
                        </div>
                        <button className='btn btn-primary bg-white text-primary skip-button' onClick={skipQuestionHandler}>Skip &gt;</button>
                    </div>

                </>
            )}
        </div>
    )
}

export default QuizPage