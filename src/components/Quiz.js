import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import home from "../assets/home.png";
import { useReward } from 'react-rewards';
import '../App.css';


export default function Quiz({ toggleIsHome, formData, lightMode, toggleLightMode }) {

    const [quizData, setQuizData] = useState([]);
    const [isShowAnswers, setIsShowAnswers] = useState(false);
    const [resetQuiz, setResetQuiz] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { numberOfQuestions, category, difficulty, type } = formData;
    const { reward, isAnimating } = useReward('balloonsReward', 'balloons');


    useEffect(() => {
        let apiLink = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
        fetch(apiLink)
            .then(res => res.json())
            .then(data => {
                setQuizData(() => {
                    return data.results.map(question => {

                        const incorrect = question.incorrect_answers.map(answer => {
                            return { value: answer, id: nanoid(), isHeld: false, isCorrect: false };
                        });

                        const correct = { value: question.correct_answer, id: nanoid(), isHeld: false, isCorrect: true };

                        let allAnswersArr = [...incorrect];
                        const randomNum = Math.floor(Math.random() * 4);
                        //insert the correct answer into the incorrect answers at a random position
                        allAnswersArr.splice(randomNum, 0, correct);

                        if (question.type === 'boolean') {
                            if (correct.value === 'True') {
                                allAnswersArr = [correct, incorrect[0]];
                            } else {
                                allAnswersArr = [incorrect[0], correct];
                            }
                        }

                        return { ...question, allAnswers: allAnswersArr, id: nanoid() };
                    });
                });
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, [resetQuiz, numberOfQuestions, type, category, difficulty]);

    // qID and aID match the correct answer and update held
    // aID is made in Question.js with .map(_, _.id)
    function updateHeld(qID, aID) {
        setQuizData(prevQuizData => {
            return prevQuizData.map(question => {
                if (qID !== question.id) {

                    return question;
                } else {
                    const newAnswers = question.allAnswers.map(answer => {

                        return answer.id === aID
                            ? { ...answer, isHeld: !answer.isHeld }
                            : { ...answer, isHeld: false };
                    });

                    return { ...question, allAnswers: newAnswers };
                }
            });
        });
    }

    function checkAnswers() {
        setIsShowAnswers(true);
    }

    let score = 0;

    if (isShowAnswers) {
        quizData.map((question) => {
            return question.allAnswers.forEach(answer => {
                return answer.isHeld && answer.isCorrect ? score++ : score;
            });
        });
    }

    /* Snap scrolling on play again */
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: window.innerWidth > 600 ? 'auto' : 'smooth',
        });
    };

    function reset() {
        setIsShowAnswers(false);
        setResetQuiz(prev => prev + 1);
        goToTop();
    }

    const questionElements = quizData.map((question, index) => {

        return (
            <Question
                key={nanoid()}
                question={question.question}
                allAnswers={question.allAnswers}
                qID={question.id}
                type={question.type}
                updateHeld={updateHeld}
                questionIndex={index}
                isShowAnswers={isShowAnswers}
            />
        );
    });

    let buttonElements = !isShowAnswers
        ?
        <div className='quiz__footer'>
            <button className='btn quiz__btn' onClick={checkAnswers}>Check Answers</button>
        </div>
        :
        <div className='quiz__footer quiz__footer--finished'>
            <p className='quiz__finalText'>{`You scored ${score}/${formData.numberOfQuestions} answers`}</p>

           {score === 5 &&
                <button disabled={isAnimating} onClick={reward} style={{ borderStyle: 'none', margin: 0, padding: 0, cursor: "pointer" }}>
                    <span id="balloonsReward" />🎉
                </button>
            }
            {score === 10 &&
                <button disabled={isAnimating} onClick={reward} style={{ borderStyle: 'none', margin: 0, padding: 0, cursor: "pointer" }}>
                    <span id="balloonsReward" />🎉
                </button>
            }

            <button className='btn quiz__btn' onClick={reset}>Play Again</button>
        </div>;



    return (


        <section className={lightMode ? "lightMode" : ""} toggle={toggleLightMode}>

            {
                isLoading
                    ?
                    <div className='quiz__loadingBox'>
                        <h3 className='quiz__loadingText'>Loading...</h3>
                    </div>
                    :
                    <>


                        <div className='quiz__answers'>
                            <img src={home} className='home' onClick={toggleIsHome} alt='home' />
                            {questionElements}
                            {buttonElements}
                        </div>
                    </>
            }

        </section >

    );
}