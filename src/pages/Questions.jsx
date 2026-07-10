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

            {/* {console.log("API Success Data", allQuestion)} */}
        </>
    )
}

export default Questions
