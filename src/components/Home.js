//import React, {useEffect, useState} from 'react';



export default function Home(props) {
    
    return (
       <main className={props.lightMode ? "lightMode" : ""}>
         
         <h1>Answer the questions and test your knowledge!</h1>
         <form>
                <label htmlFor='numberOfQuestions'>Number of Questions:</label>
                <select
                    onChange={props.handleFormChange}
                    value={props.formData.numberOfQuestions}
                    name='numberOfQuestions'
                    id='numberOfQuestions'
                >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                   
                </select>
                <br/>
                <label htmlFor='category'>Select Category:</label>
                <select
                    onChange={props.handleFormChange}
                    value={props.formData.category}
                    name='category'
                    id='category'
                >
                    <option value=''>Any Category</option>
                    <option value='9'>General Knowledge</option>
                    <option value='10'>Books</option>
                    <option value='11'>Film</option>
                    <option value='12'>Music</option>
                    <option value='13'>Musicals & Theatres</option>
                    <option value='14'>Television</option>
                    <option value='15'>Video Games</option>
                    <option value='16'>Board Games</option>
                    <option value='17'>Science & Nature</option>
                    <option value='18'>Computers</option>
                    <option value='19'>Mathematics</option>
                    <option value='20'>Mythology</option>
                    <option value='21'>Sports</option>
                    <option value='22'>Geography</option>
                    <option value='23'>History</option>
                    <option value='24'>Politics</option>
                    <option value='25'>Art</option>
                    <option value='26'>Celebrities</option>
                    <option value='27'>Animals</option>
                    <option value='28'>Vehicles</option>
                    <option value='29'>Comics</option>
                    <option value='30'>Gadgets</option>
                    <option value='31'>Anime & Manga</option>
                    <option value='32'>Cartoons & Animations</option>
                </select>
                <br/>
                <label htmlFor='difficulty'>Select Difficulty:</label>
                <select
                    onChange={props.handleFormChange}
                    value={props.formData.difficulty}
                    name='difficulty'
                    id='difficulty'
                >
                    <option value=''>Any Difficulty</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <br/>
                <label htmlFor='type'>Select Type:</label>
                <select
                    onChange={props.handleFormChange}
                    value={props.formData.type}
                    name='type'
                    id='type'
                >
                    <option value=''>Any Type</option>
                    <option value='multiple'>Multiple Choice</option>
                    <option value='boolean'>True / False</option>
                   
                </select>
            </form>
            <div className='home__btnCtr' style={{width: 'min(235px, 90%)'}}>
                <button onClick={props.toggleIsHome}  className='btn home__startBtn'>Start Quiz</button>
            </div>
                           
         
       </main>
    )
}