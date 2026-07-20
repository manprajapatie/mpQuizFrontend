import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllQuiz } from '../features/quizList/quizListSlice'

const QuizList = () => {

  const dispatch = useDispatch()

  //Take List of quiz from redux
  const { data, loading, error } = useSelector(state => state.quizList)

  //fetch List of quiz
  useEffect(() => {
    dispatch(fetchAllQuiz());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Available Quizzes</h1>

        {data && data.length > 0 ? (
          data.map((quiz) => (
            <div
              key={quiz.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
              }}
            >
              <h2>{quiz.title}</h2>

              <p>Total Questions: {quiz.totalQuestions}</p>

              <button>Start Quiz</button>
            </div>
          ))
        ) : (
          <h3>No Quiz Available</h3>
        )}
      </div>
    </>
  )
}

export default QuizList
