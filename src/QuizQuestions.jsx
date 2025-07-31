import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // sends http request and fetches data
import { useParams, useNavigate } from 'react-router-dom'; // params fetch quiz topic
import './App.css';

const QuizQuestions = () => { // quiz topic layout
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); //user selected answers
  const [quizEnded, setQuizEnded] = useState(false);
  const [timer, setTimer] = useState(600);
  const intervalRef = useRef(null);
 const apiUrl = 'https://quiz-app-2-k34l.onrender.com';


 const user = JSON.parse(localStorage.getItem('user')) || {}; 
   const username = user.name || 'Guest';


  useEffect(() => {
 axios
    .get(`https://quiz-app-2-k34l.onrender.com/questions/${topic}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Error fetching questions", err));
  }, [topic]);

  useEffect(() => { //timer 
    if (!quizEnded) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [quizEnded]);

  const handleOptionClick = (answer) => { // saves selected option answers
    const updated = [...selectedOptions];
    updated[currentQuestion] = answer;
    setSelectedOptions(updated);
  };

  const handleNext = () => { // navigate to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => { // navigate back to previous question
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
  clearInterval(intervalRef.current);

  const calculatedScore = questions.reduce((acc, q, idx) => {
    return acc + (q.correctAnswer === selectedOptions[idx] ? 1 : 0); // calculates score
  }, 0);

  const totalTimeTaken = 600 - timer;

  setQuizEnded(true);

  try {
 await axios.post(`https://quiz-app-2-k34l.onrender.com/answers/submit`, { // submit score at backend with all other data


   username: username,

      topic,
      score: calculatedScore,
      timeTaken: totalTimeTaken
    });

    console.log(" Submission successful"); 
  } catch (err) {
    console.error(" Submission failed:", err.response?.data || err.message); // error if not submitted
  }
};




  if (!questions.length) return <div className="text-center mt-10 text-xl">Loading questions...</div>; // if question not appeared

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="quiz-container-centered">
      <div className="page-card text-center w-full max-w-md">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center text-sm text-blue-300">
          <button onClick={() => navigate('/')} className="page-footer-link">
            ← Back to Home
          </button>
          <div className="bg-blue-600 px-3 py-1 rounded-full text-white font-semibold">
            {minutes}:{seconds < 10 ? '0' : ''}{seconds}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {!quizEnded ? (
          <>
            {/* Question */}
            <h2 className="text-xl font-bold text-blue-400 mb-6">
              {questions[currentQuestion].questionText}
            </h2>

            {/* Options */}
            <div className="w-full">
              {questions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`input-field text-left cursor-pointer ${
                    selectedOptions[currentQuestion] === opt ? 'option-box selected' : ''
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="button-primary"
                  style={{ maxWidth: '150px' }}
                >
                  ← Previous
                </button>
              )}

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="button-primary"
                  style={{ maxWidth: '150px' }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="button-primary"
                  style={{ maxWidth: '180px' }}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-green-400">
              Thank you for taking the quiz!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestions;
