import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllQuiz } from '../features/quizList/quizListSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const QuizList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  //Take List of quiz from redux
  const { data = [], loading, error } = useSelector(state => state.quizList)


  //fetch List of quiz
  useEffect(() => {
    dispatch(fetchAllQuiz());
  }, [dispatch]);

  // Motion for smooth Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* ------ Header Section ------ */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Available Quizzes
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Select a quiz below to test your knowledge. Each quiz tracks your response accuracy and duration.
          </p>
        </header>

        {/* ------- Loading Skeleton ------- */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-48"
              >
                <div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md w-1/2" />
                </div>
                <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        )}

        {/* -------- Error section -------- */}
        {!loading && error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center max-w-lg mx-auto my-12"
          >
            <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              !
            </div>
            <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300">Unable to load quizzes</h3>
            <p className="text-sm text-rose-600 dark:text-rose-400/80 mt-1">{error}</p>
            <button
              onClick={() => dispatch(fetchAllQuiz())}
              className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* -------- Quiz Cards  ------- */}
        {!loading && !error && data && data.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data.map((quiz) => (
              <motion.div
                key={quiz.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
                    {quiz.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{quiz.totalQuestions || 0} Total Questions</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-indigo-500/20"
                >
                  <span>Start Quiz</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ------- Empty State ------- */}
        {!loading && !error && (!data || data.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto"
          >
            <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Quizzes Available</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Check back later for newly published quizzes.
            </p>
          </motion.div>
        )}

      </div>
    </div>
    </>
  )
}

export default QuizList
