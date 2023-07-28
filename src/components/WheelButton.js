import React from 'react'

const WheelButton = ({knobRotation, changeQuestionHandler}) => {
    return (
        <div className='d-flex justify-content-center'>
            <div
                className="knob"
                style={{ transform: `rotate(${knobRotation}deg)` }}
            ></div>
            <div className="half-circle-button" onClick={changeQuestionHandler}>Next</div>
        </div>
    )
}

export default WheelButton