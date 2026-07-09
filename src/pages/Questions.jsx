import React, { useEffect, useState } from 'react'
import { getAllQuestions } from '../services/quizAPI';

const Questions = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getAllQuestions()
            .then((data) => {
                console.log("API Success Data", data);
                setData(data)

            })
    }, [])

    return (
        <>
            <h1> All Questions </h1>


        </>
    )
}

export default Questions
