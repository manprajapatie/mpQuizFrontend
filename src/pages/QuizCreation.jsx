import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../features/quizCreation/quizCreation';

const QuizCreation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");

  const handleFormReq = (e) => {
    e.preventDefault();
    dispatch(fetchQuizQuestions({ category, number, title }))
     console.log(`Category ${category}
  Number ${number}
  title ${title}`);

    //Navigate to Quiz
    navigate(`/quiz/${category}/${number}/${title}`)
  }
 


  return (
    <>
      <h1 className='text-8xl font-extrabold '>
        Quiz Creaction
      </h1>


      {/* ----------- Form For Quiz Creation ----------- */}

      <form onSubmit={handleFormReq}>

        {/* ----------- Category ----------- */}
        <label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
        </label>

        {/* ----------- Question Quantity ----------- */}
        <label>
          <input
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number"
            required
          />
        </label>

        {/* ----------- Name Title ----------- */}
        <label>
          <input
            type="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </label>
        <button
          type='submit'>
          Create Quiz
        </button>

      </form>
    </>
  )
}

export default QuizCreation
