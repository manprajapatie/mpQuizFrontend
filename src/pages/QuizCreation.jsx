import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Layers, ListOrdered, Type, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { fetchQuizQuestions } from '../features/quizCreation/quizCreation';

const QuizCreation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Form State
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");


  // state for loading and error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleFormReq = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {

      // Create Quiz
      const quizId = await dispatch(
        fetchQuizQuestions({
          category,
          number,
          title
        })
      ).unwrap();

      console.log("Created Quiz Id:", quizId);

      // Navigate to quiz page
      navigate(`/quiz/${quizId}`);

    } catch (err) {

      console.error(quizIdError => err);
      setFormError(err?.message || "Failed to generate quiz. Please verify your connection.");
    }
    finally {
      setIsSubmitting(false);
    }

  }



  return (
    <>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300 overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-125 w-125 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
          <div className="absolute bottom-[-15%] right-[-10%] h-150 w-150 rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/5" />
        </div>

        <div className="w-full max-w-xl">
          {/* Header  */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create a New Quiz
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
              Configure your focus parameters to assemble a custom targeted question
            </p>
          </motion.div>

          {/* ----------- Form Error ----------- */}
          {formError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/40 p-4 mb-6"
            >
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">Generation Error</h4>
                <p className="text-xs text-rose-700 dark:text-rose-400 mt-0.5">{formError}</p>
              </div>
            </motion.div>
          )}

          {/* Card  */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-sm"
          >
            <form onSubmit={handleFormReq} className="flex flex-col gap-6">

              {/* Input Title */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quiz-title" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pl-1">
                  <Type className="h-3.5 w-3.5 text-indigo-500" />
                  Quiz Title
                </label>
                <input
                  id="quiz-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Frontend Fundamentals Challenge"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-950 placeholder-slate-400 shadow-inner outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-600 dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                />
              </div>

              {/* Input Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quiz-category" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pl-1">
                  <Layers className="h-3.5 w-3.5 text-indigo-500" />
                  Knowledge Domain / Category
                </label>
                <input
                  id="quiz-category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Java"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-950 placeholder-slate-400 shadow-inner outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-600 dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                />
              </div>

              {/* Input Question Quantity Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quiz-quantity" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pl-1">
                  <ListOrdered className="h-3.5 w-3.5 text-indigo-500" />
                  Number of Questions
                </label>
                <input
                  id="quiz-quantity"
                  type="number"
                  min="1"
                  max="50"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="ex. 10"
                  required
                  disabled={isSubmitting}
                  // Using webkit logic and appearance for Removing arrow adjestment for number
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-950 placeholder-slate-400 shadow-inner outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-600 dark:focus:border-indigo-500 dark:focus:bg-slate-950 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? {} : { scale: 1.01, y: -1 }}
                whileTap={isSubmitting ? {} : { scale: 0.99 }}
                className="group relative mt-2 w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                    Compiling Data Model...
                  </>
                ) : (
                  <>
                    Generate Quiz Layout
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default QuizCreation
