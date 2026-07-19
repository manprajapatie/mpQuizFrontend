import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from 'motion/react';

import { fetchQuizById } from "../features/quiz/quizSlice";
import { submitQuizThunk, clearResult } from "../features/submitQuiz/submitQuizSlice";

const StartQuiz = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  // Fetch Question
  const { questions = [], loading: quizLoading, error: quizError } = useSelector(
    (state) => state.quiz
  );

  //Fetch score, is submit and error
  const { score, loading: submitLoading, error: submitError } = useSelector((state) => state.submitQuiz);

  // Stores selected answers
  const [answers, setAnswers] = useState({});

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {

    dispatch(fetchQuizById(id));

    // Clear score states
    dispatch(clearResult());
  }, [dispatch, id]);

  // Handle active timer
  useEffect(() => {
    if (isTimerActive && !quizLoading && !quizError && questions.length > 0) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, quizLoading, quizError, questions]);

  // Final Time after submission
  useEffect(() => {
    if (score !== null) {
      setIsTimerActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [score]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // const { score } = useSelector(
  //   state => state.submitQuiz
  // );


  const handleSubmit = () => {
    if (answeredCount === 0 || submitLoading) return;

    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      id: Number(questionId),
      response: answers[questionId]
    }));

    dispatch(
      submitQuizThunk({
        quizId: id,
        answers: formattedAnswers
      })
    );
  };

  const handleOptionChange = (questionId, option) => {
    if (score !== null || submitLoading) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  // reset function if user want to  retry with quiz
  const handleResetQuiz = () => {
    dispatch(clearResult());
    setAnswers({});
    setSecondsElapsed(0);
    setIsTimerActive(true);
    dispatch(fetchQuizById(id));
  };

  const totalQuestions = questions?.length || 0;
  const answeredCount = Object.keys(answers).length;
  const isQuizComplete = answeredCount === totalQuestions && totalQuestions > 0;

  // loading layout
  if (quizLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-indigo-600"
        />
        <h2 className="text-xl font-medium text-slate-600 dark:text-slate-400">Loading Quiz questions...</h2>
      </div>
    );
  }

  // initial loading error if fail
  if (quizError) {
    return (
      <div className="mx-auto max-w-md mt-12 text-center p-6 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
        <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400">Failed to load quiz</h2>
        <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mt-1">{quizError}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* ------ Header Layer ------ */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">Live Session</span>
              <h1 className="text-3xl font-black tracking-tight mt-0.5">Quiz In Progress</h1>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-sm">
                <span className={`h-2 w-2 rounded-full ${score !== null ? 'bg-slate-400' : 'bg-rose-500 animate-pulse'}`} />
                <span className="text-xs text-slate-500 font-medium">Time Taken:</span>
                <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">
                  {formatTime(secondsElapsed)}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Answered:</span>
                <span className="font-bold text-sm bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-indigo-600 dark:text-indigo-400">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>
            </div>
          </header>

          {/* --- Post Quiz Score Display --- */}
          <AnimatePresence>
            {score !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-xl shadow-indigo-500/20"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold tracking-wide">Quiz Evaluated Successfully!</h2>
                    <p className="text-indigo-100 text-sm mt-1">
                      Your answers were submitted securely and graded.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl text-center flex-1 sm:flex-none min-w-25">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-200">Total Duration</span>
                      <span className="text-xl font-mono font-black">{formatTime(secondsElapsed)}</span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl text-center flex-1 sm:flex-none min-w-25">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-200">Your Score</span>
                      <span className="text-2xl font-black">{score}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ------- Submission Errors ------- */}
          {submitError && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-xl text-sm text-rose-600 dark:text-rose-400 font-medium">
              Error processing submission: {submitError}
            </div>
          )}

          {/* ------- Questions ------- */}
          <div className="space-y-6">
            {questions.map((question, index) => {
              const currentAnswer = answers[question.id];

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 transition-all duration-300 ${currentAnswer
                      ? 'border-indigo-200 dark:border-indigo-900/50 shadow-md shadow-slate-100/50 dark:shadow-none'
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      Question {index + 1}
                    </span>
                    {currentAnswer && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-100 mb-5">
                    {question.questionTitle}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[question.option1, question.option2, question.option3, question.option4].map((option, opIndex) => {
                      const isSelected = currentAnswer === option;

                      return (
                        <button
                          key={opIndex}
                          onClick={() => handleOptionChange(question.id, option)}
                          disabled={score !== null || submitLoading}
                          className={`group w-full flex items-center text-left px-4 py-3.5 rounded-xl border transition-all relative ${isSelected
                              ? 'bg-indigo-50/60 border-indigo-500 text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-200 font-semibold'
                              : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 dark:bg-slate-950/20 dark:border-slate-800 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                            } ${(score !== null || submitLoading) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                        >
                          <div className={`h-6 w-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 mr-3 transition-colors ${isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-500 group-hover:border-slate-300'
                            }`}>
                            {String.fromCharCode(65 + opIndex)}
                          </div>

                          <span className="text-sm wrap-break-word pr-4 flex-1">{option}</span>

                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 dark:border-slate-700'
                            }`}>
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ------ Submission  --- */}
          <footer className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              {submitLoading
                ? "Transmitting payload to slice thunk..."
                : score !== null
                  ? "Grading sequence terminal."
                  : isQuizComplete
                    ? "All inputs loaded. Ready to submit to grading context."
                    : `Please make selections across remaining ${totalQuestions - answeredCount} active items.`}
            </p>

            <div className="flex gap-3 w-full sm:w-auto">
              {score !== null && (
                <button
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                >
                  Retake Quiz
                </button>
              )}

              <motion.button
                whileHover={score !== null || answeredCount === 0 || submitLoading ? {} : { scale: 1.02 }}
                whileTap={score !== null || answeredCount === 0 || submitLoading ? {} : { scale: 0.98 }}
                onClick={handleSubmit}
                disabled={score !== null || answeredCount === 0 || submitLoading}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${score !== null
                    ? 'bg-emerald-600 text-white cursor-not-allowed shadow-none'
                    : submitLoading
                      ? 'bg-indigo-400 text-indigo-100 cursor-wait animate-pulse'
                      : answeredCount === 0
                        ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed shadow-none'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/10'
                  }`}
              >
                {submitLoading ? "Submitting..." : score !== null ? "Quiz Completed" : "Submit Complete Quiz"}
              </motion.button>
            </div>
          </footer>

        </div>
      </div>

    </>
  )
}

export default StartQuiz
