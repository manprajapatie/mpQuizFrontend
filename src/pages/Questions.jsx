import React, { useEffect, useState } from 'react'
import { getAllQuestions } from '../services/quizAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestion } from '../features/allQuestion/allQuestionSlice';

const Questions = () => {

    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    //fetch all the question
    useEffect(() => {
        dispatch(fetchAllQuestion());
    }, [dispatch]);


    const allQuestion = useSelector(state => state.allQuestion)
    console.log("API Success Data", allQuestion)


    return (
        <>
            <h1> All Questions </h1>
            {
                allQuestion.data?.map((question) => (
                    <div key={question.id}>
                        <p>{question.questionTitle}</p>
                        <p>{question.option1}</p>
                        <p>{question.option2}</p>
                        <p>{question.option3}</p>
                        <p>{question.option4}</p>
                        <p>{question.rightAnswer}</p>
                        <p>{question.category}</p>
                        <p>{question.difficultyLevel}</p>
                    </div>
                ))
            }

        </>
    )
}

export default Questions
