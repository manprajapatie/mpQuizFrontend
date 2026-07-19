import React, { useEffect, useState } from 'react'
import { getAllQuestions } from '../services/quizAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestion } from '../features/allQuestion/allQuestionSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Layers3, Zap, ChevronDown, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const Questions = () => {

    const dispatch = useDispatch();

    //Take Data from redux
    const { data, loading, error } = useSelector(state => state.allQuestion)

    // Pagination For optimization
    const QUESTIONS_PER_PAGE = 8;
    const [visibleCount, setVisibleCount] = useState(QUESTIONS_PER_PAGE);

    //fetch all the data
    useEffect(() => {
        dispatch(fetchAllQuestion());
    }, [dispatch]);

    // fallback to an empty array if data is null/undefined initially
    const rawQuestions = Array.isArray(data) ? data : (data?.data || []);

    // Dynamicly setup number of pagination values
    const displayedQuestions = rawQuestions.slice(0, visibleCount);
    const totalQuestions = rawQuestions.length;
    const hasMore = visibleCount < totalQuestions;

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + QUESTIONS_PER_PAGE);
    };

    // Utility to style difficulty badges dynamically
    const getDifficultyColor = (level) => {
        const lowerLevel = level?.toLowerCase() || '';
        if (lowerLevel.includes('easy')) return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50';
        if (lowerLevel.includes('medium')) return 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/50';
        if (lowerLevel.includes('hard')) return 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/50';
        return 'text-slate-500 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800';
    };

    // motion animation for smooth entry
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 18 }
        }
    };

    console.log("API Success Data", data)


    return (
        <>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

                {/* Dynamic Background decorative blurs */}
                <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none overflow-hidden">
                    <div className="absolute top-10 left-1/4 h-75 w-75 rounded-full bg-indigo-200/20 blur-[100px] dark:bg-indigo-600/10" />
                    <div className="absolute bottom-20 right-1/4 h-62.5 w-62.5 rounded-full bg-emerald-200/20 blur-[100px] dark:bg-emerald-600/10" />
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">

                    {/* Header of All Question */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-8 mb-10"
                    >
                        <div>
                            <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Question Bank
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                                Explore your collection of quiz challenges, verified choices, and target answers.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-white dark:bg-slate-900 px-6 py-3 shadow-inner border border-slate-100 dark:border-slate-800">
                            <Layers3 className="h-5 w-5 text-indigo-500" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Total Questions: {loading ? '...' : totalQuestions}
                            </span>
                        </div>
                    </motion.div>

                    {/* --------------- Loading State --- */}
                    {loading && totalQuestions === 0 && (
                        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="rounded-full bg-indigo-100 dark:bg-slate-800 p-5 text-indigo-600 dark:text-indigo-400"
                            >
                                <BrainCircuit className="h-10 w-10" />
                            </motion.div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Syncing Knowledge Base...</h2>
                            <p className="text-slate-500 dark:text-slate-400">Streaming questions securely from store.</p>
                        </div>
                    )}

                    {/* Error State --- */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center gap-4 py-16 text-center bg-rose-50 dark:bg-slate-900 border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl"
                        >
                            <XCircle className="h-12 w-12 text-rose-500" />
                            <h2 className="text-xl font-bold text-rose-950 dark:text-rose-100">Unable to load questions</h2>
                            <p className="text-sm text-rose-700 dark:text-rose-300 max-w-sm px-4">
                                {typeof error === 'object' ? 'An unexpected API error occurred.' : error}
                            </p>
                            <button
                                onClick={() => dispatch(fetchAllQuestion())}
                                className="mt-2 px-5 py-2 rounded-full bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition"
                            >
                                Retry Connection
                            </button>
                        </motion.div>
                    )}

                    {/* Empty State (No questions found) --- */}
                    {!loading && !error && totalQuestions === 0 && data !== null && (
                        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
                            <AlertTriangle className="mx-auto h-12 w-12 text-amber-400 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No questions found</h3>

                        </div>
                    )}

                    {/* Questions layout --- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {displayedQuestions.map((question, index) => (
                                <motion.div
                                    key={question.id || index}
                                    variants={itemVariants}
                                    layout
                                    className="group relative flex flex-col gap-5 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors duration-200"
                                >
                                    {/* Info about question */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1.5 rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                                            <Layers3 className="h-3.5 w-3.5 text-indigo-500" />
                                            {question.category || 'General Knowledge'}
                                        </div>
                                        <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getDifficultyColor(question.difficultyLevel)}`}>
                                            <Zap className="h-3.5 w-3.5" />
                                            {question.difficultyLevel || 'Medium'}
                                        </div>
                                    </div>

                                    {/* Question Text */}
                                    <h2 className="text-lg font-semibold leading-tight text-slate-900 dark:text-white">
                                        <span className="text-indigo-500 font-bold mr-1.5">{index + 1}.</span>
                                        {question.questionTitle}
                                    </h2>

                                    {/* Multiple Choice Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {[question.option1, question.option2, question.option3, question.option4].map((option, opIndex) => (
                                            <div
                                                key={opIndex}
                                                className="flex items-start gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3 text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                <span className="font-bold text-xs text-slate-400 dark:text-slate-600 pt-0.5">{String.fromCharCode(65 + opIndex)}:</span>
                                                <span className="wrap-break-word w-full">{option}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Divider Line */}
                                    <div className="border-t border-slate-100 dark:border-slate-800/80 my-1" />

                                    {/* Verified Target Answer Card */}
                                    <div className="flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/70 dark:border-emerald-900/30 p-3.5 shadow-inner">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-800/70 dark:text-emerald-400/70 uppercase tracking-wider">Correct Answer</p>
                                            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100 wrap-break-word">{question.rightAnswer}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/*Show More Button --- */}
                    {totalQuestions > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center gap-4 mt-16 pt-10 border-t border-slate-200 dark:border-slate-800"
                        >
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                Viewing <span className="font-bold text-indigo-600 dark:text-indigo-400">{displayedQuestions.length}</span> of <span className="font-semibold text-slate-700 dark:text-slate-300">{totalQuestions}</span> questions
                            </p>

                            {hasMore ? (
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleShowMore}
                                    className="group flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
                                >
                                    Load Next Questions
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                </motion.button>
                            ) : (
                                <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                                    All available questions loaded.
                                </div>
                            )}
                        </motion.div>
                    )}

                </div>
            </div>

        </>
    )
}

export default Questions
