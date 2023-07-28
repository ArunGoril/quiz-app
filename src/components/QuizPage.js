import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { QuizData } from '../data/QuizData'
import OptionComponent from './OptionComponent'
import QuestionComponent from './QuestionComponent'
import QuizResult from './QuizResult'
import WheelButton from './WheelButton'

const QuizPage = () => {
    // const [QuizData, setQuizData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [score, setScore] = useState(0)
    const [selectedOption, setSelectedOption] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [knobRotation, setKnobRotation] = useState(0);
    const [ballPosition, setBallPosition] = useState({x: 0, y: 0})
    const [buttonClicked, setButtonClicked] = useState(false)
    const [isCorrect, setIsCorrect] = useState(null)
    const ballRef = useRef()
    const optionsContainerRef = useRef()

    // useEffect(()=>{
    //     const fetchData = async () => {
    //         const res = await axios.get("http://localhost:9002/api/quiz")
    //         const data = await res.data
    //         console.log(data)
    //         setQuizData(data)
    //     }
    //     fetchData()
    // }, [])

    const handleSelectOption = (optionNo) => {
        setSelectedOption(optionNo);
        const rotationValue = 30 * optionNo - 75; // Assuming each option is separated by 90 degrees
        setKnobRotation(rotationValue);
      };

    const changeQuestionHandler = () => {
        if (selectedOption === 0) {
            alert("Please select a option")
            return
        }
        const ball = ballRef.current
        const optionContainer = optionsContainerRef.current
        const ballRect = ball.getBoundingClientRect()
        const optionContainerRect = optionContainer.getBoundingClientRect()
        const xDistance = (optionContainerRect.width/4)*(selectedOption-1)-(optionContainerRect.width/2)+(optionContainerRect.width/8)
        const yDistance = ballRect.bottom - optionContainerRect.bottom
        // console.log(xDistance, yDistance)
        setBallPosition({x: xDistance, y: -yDistance})
        setButtonClicked(true)
        updateScore()
        
        setTimeout(() => {
            if (currentQuestion < QuizData.length) {
                setCurrentQuestion(prevQuestion => prevQuestion + 1)
                setSelectedOption(0)
            } else {
                setShowResult(true)
            }
            setBallPosition({x: 0, y: 0})
            setButtonClicked(false)
            setIsCorrect(null)
            setKnobRotation(0)
        }, 1500)
    }

    const skipQuestionHandler = () => {
        if (currentQuestion < QuizData.length) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1)
            setSelectedOption(0)
            setKnobRotation(0)
            setButtonClicked(false)
            setIsCorrect(null)
        } else {
            setShowResult(true)
        }
    }

    const updateScore = () => {
        if (selectedOption === QuizData[currentQuestion - 1].answer) {
            setScore(prevScore => prevScore + 10)
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }

    const resetAll = () => {
        setCurrentQuestion(1)
        setScore(0)
        setSelectedOption(0)
        setShowResult(false)
        setKnobRotation(0)
        setKnobRotation(0)
        setBallPosition({x: 0, y: 0})
        setButtonClicked(false)
        setIsCorrect(null)
    }

    return (
        <div>
            {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length * 10} tryAgain={resetAll} />
            ) : (
                <>
                    <div className='row-reverse quiz-container'>
                        <div className='col' ref={optionsContainerRef}>
                            <QuestionComponent questionObject={QuizData[currentQuestion - 1]} questionNo={currentQuestion} score={score} />
                            <OptionComponent questionObject={QuizData[currentQuestion - 1]} selectedOption={selectedOption} handleSelectOption={handleSelectOption} buttonClicked={buttonClicked} isCorrect={isCorrect} />
                        </div>
                        <div className='col wheel-container'>
                            <WheelButton options knobRotation={knobRotation} changeQuestionHandler={changeQuestionHandler} />
                        </div>
                        <button className='btn btn-primary bg-white text-primary skip-button' onClick={skipQuestionHandler}>Skip &gt;</button>
                        <div className='ball bg-primary' ref={ballRef} style={{transform: `translate(${ballPosition.x}px, ${ballPosition.y}px)`}}></div>
                    </div>
                </>
            )}
        </div>
    )
}

export default QuizPage