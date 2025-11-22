import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Trophy, PartyPopper } from 'lucide-react'
import './SlideStyles.css'

const quizQuestions = [
  {
    id: 1,
    question: 'HTTP Polling is like...',
    options: [
      'A patient person waiting for a bus',
      'A kid asking "are we there yet?" every 2 seconds',
      'Checking Swiggy every minute for your biryani order',
      'A wise owl contemplating life'
    ],
    correct: 2,
    explanation: 'Exactly! HTTP Polling is like constantly checking Swiggy for your biryani - asking "is it ready yet?" even though it\'s still being prepared! 😅🍛'
  },
  {
    id: 2,
    question: 'WebSocket is perfect for...',
    options: [
      'Sending letters via India Post (still waiting...)',
      'Real-time chat where both sides can talk',
      'One-way communication like AI explaining protocols non-stop',
      'Yelling into the void (like traffic in Hitech City)'
    ],
    correct: 1,
    explanation: 'Bingo! WebSocket is like a proper WhatsApp call - both sides can talk anytime! Unlike AI that just keeps talking! 🎙️😂'
  },
  {
    id: 3,
    question: 'SSE (Server-Sent Events) is like...',
    options: [
      'Bidirectional like a phone call with your mom',
      'Unidirectional like listening to a radio station',
      'Multidirectional like a family WhatsApp group',
      'No-directional like finding parking in Banjara Hills'
    ],
    correct: 1,
    explanation: 'Correct! SSE is like listening to a radio station - server keeps sending, you just listen! No talking back! 📻'
  },
  {
    id: 4,
    question: 'Which protocol wastes the most bandwidth?',
    options: [
      'WebSocket (it\'s too efficient)',
      'HTTP Polling (asking "got anything?" like checking biryani status)',
      'SSE (streaming is expensive)',
      'WebTransport (too many streams, like heavy traffic)'
    ],
    correct: 1,
    explanation: 'HTTP Polling wins! It\'s like constantly checking if your biryani is ready - wastes bandwidth, battery, and your patience! But hey, Hyderabad biryani is worth the wait! 🏆🍛'
  },
  {
    id: 5,
    question: 'If you need to send data from client to server in real-time, use...',
    options: [
      'SSE (it\'s perfect for this - said no one ever)',
      'HTTP Polling (the classic way)',
      'WebSocket (bidirectional magic)',
      'Carrier pigeons (very reliable)'
    ],
    correct: 2,
    explanation: 'WebSocket is your friend! SSE only goes server→client (like one-way traffic), but WebSocket goes both ways! 🔄'
  }
]

function QuizSlide() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    return (
      <div className="slide quiz-slide">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="quiz-results"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="trophy-icon"
          >
            {percentage >= 80 ? (
              <Trophy className="trophy gold" size={80} />
            ) : percentage >= 60 ? (
              <Trophy className="trophy silver" size={80} />
            ) : (
              <PartyPopper className="trophy bronze" size={80} />
            )}
          </motion.div>

          <h1 className="results-title">Quiz Complete! 🎉</h1>
          
          <div className="score-display">
            <div className="score-number">{score} / {quizQuestions.length}</div>
            <div className="score-percentage">{percentage}%</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="results-message"
          >
            {percentage === 100 && (
              <p className="message-text">🏆 Perfect Score! You're a Protocol Master! 🏆</p>
            )}
            {percentage >= 80 && percentage < 100 && (
              <p className="message-text">🌟 Excellent! You really know your protocols! 🌟</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="message-text">👍 Good job! You're getting the hang of it! 👍</p>
            )}
            {percentage < 60 && (
              <p className="message-text">💪 Keep learning! Protocols are tricky, but you'll get there! 💪</p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={resetQuiz}
            className="retry-button"
          >
            Try Again! 🔄
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="slide quiz-slide">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="slide-content"
      >
        <div className="quiz-header">
          <h1 className="slide-title">Quiz Time! 🎯</h1>
          <div className="quiz-progress">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="progress-text">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="question-container"
        >
          <h2 className="question-text">{question.question}</h2>

          <div className="options-container">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correct
              const showResult = showExplanation && isSelected

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`option-button ${
                    showResult
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : selectedAnswer === index
                      ? 'selected'
                      : ''
                  }`}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {showResult && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="option-icon"
                    >
                      {isCorrect ? (
                        <CheckCircle size={24} />
                      ) : (
                        <XCircle size={24} />
                      )}
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="explanation-box"
              >
                <p className="explanation-text">{question.explanation}</p>
                <motion.button
                  onClick={handleNext}
                  className="next-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'See Results! 🎉'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default QuizSlide
