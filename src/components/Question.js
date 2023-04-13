import React from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
/*since the API data for the questions and answers include html entities,
  he is to decode html entities into readable text, */
import '../App.css';


export default function Question({ allAnswers, qID, question, isShowAnswers, updateHeld }) {
    const answerButtonsJSX = allAnswers.map((answer, index) => {

        //Held Button Styles
        let styles = {
            backgroundColor: answer.isHeld ? 'var(--isHeld-bg-color)' : 'var(--bg-color)',
            color: answer.isHeld ? 'black' :  'var(--color)'

        };

        if (isShowAnswers) {

            if (answer.isHeld && answer.isCorrect) {
                styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)', border: 'none' };

            } else if (answer.isHeld && !answer.isCorrect) {
                styles = { backgroundColor: '#F8BCBC', opacity: '80%', border: 'none', color: 'var(--focused-btn-color)' };

            } else if (answer.isCorrect) {
                styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)', border: 'none' };

            } else if (!answer.isCorrect) {
                styles = { opacity: '50%' };
            }
        }

        return (
            <button key={nanoid()}
                onClick={() => updateHeld(qID, answer.id)}
                className='btn question__btn'
                style={styles}
                data-testid={`button${index}`}
            >
                {he.decode(allAnswers[index].value)}
            </button>
        );
    }); // end of answerButtonsJSX


    return (
        <div className='question__component'>
            <h3 className='question__question'>
                {he.decode(question)}
            </h3>
            <div className='question__btnctr'>
                {answerButtonsJSX}
            </div>
        </div>
    );
}