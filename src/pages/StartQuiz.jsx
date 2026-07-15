import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchQuizById } from "../features/quiz/quizSlice";
import { submitQuizThunk } from "../features/submitQuiz/submitQuizSlice";

const StartQuiz = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  const { questions, loading, error } = useSelector(
    (state) => state.quiz
  );

  // Stores selected answers
  const [answers, setAnswers] = useState({});

  useEffect(() => {

    dispatch(fetchQuizById(id));

  }, [dispatch, id]);

  const { score } = useSelector(
    state => state.submitQuiz
  );
  const handleSubmit = async () => {

    const formattedAnswers = Object.keys(answers).map((questionId) => ({

      id: Number(questionId),

      response: answers[questionId]

    }));

    console.log(formattedAnswers);

    await dispatch(

      submitQuizThunk({

        quizId: id,

        answers: formattedAnswers

      })

    );

  };

  const handleOptionChange = (questionId, option) => {

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));

  };

  if (loading) {
    return <h2>Loading Quiz...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }


  return (
    <>
      <h2 className='text-4xl font-bold'>
        Quiz Has been started
      </h2>

      <div>

        <h1>Start Quiz</h1>

        {

          questions.map((question, index) => (

            <div
              key={question.id}
              style={{
                border: "1px solid gray",
                padding: "20px",
                marginBottom: "20px"
              }}
            >

              <h3>

                {index + 1}. {question.questionTitle}

              </h3>

              <label>

                <input
                  type="radio"
                  name={question.id}
                  value={question.option1}
                  checked={
                    answers[question.id] === question.option1
                  }
                  onChange={() =>
                    handleOptionChange(
                      question.id,
                      question.option1
                    )
                  }
                />

                {question.option1}

              </label>

              <br />

              <label>

                <input
                  type="radio"
                  name={question.id}
                  value={question.option2}
                  checked={
                    answers[question.id] === question.option2
                  }
                  onChange={() =>
                    handleOptionChange(
                      question.id,
                      question.option2
                    )
                  }
                />

                {question.option2}

              </label>

              <br />

              <label>

                <input
                  type="radio"
                  name={question.id}
                  value={question.option3}
                  checked={
                    answers[question.id] === question.option3
                  }
                  onChange={() =>
                    handleOptionChange(
                      question.id,
                      question.option3
                    )
                  }
                />

                {question.option3}

              </label>

              <br />

              <label>

                <input
                  type="radio"
                  name={question.id}
                  value={question.option4}
                  checked={
                    answers[question.id] === question.option4
                  }
                  onChange={() =>
                    handleOptionChange(
                      question.id,
                      question.option4
                    )
                  }
                />

                {question.option4}

              </label>

            </div>

          ))

        }

        <button onClick={handleSubmit}>

          Submit Quiz

        </button>

        {
          score !== null && (

            <h2>

              Your Score : {score}

            </h2>

          )
        }

      </div>

    </>
  )
}

export default StartQuiz
