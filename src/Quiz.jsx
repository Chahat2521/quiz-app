import React, { useEffect, useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./AuthContext"; // ✅ Correct



function Quiz() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);


  const quizzes = [
    { id: "html", title: "HTML Quiz", description: "Test your HTML basics." },
    { id: "css", title: "CSS Quiz", description: "Check your CSS skills." },
    { id: "react", title: "React Quiz", description: "React component mastery." },
  ];

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleStart = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/quiz/${id}`); // ✅ Route should match "/quiz/:topic"
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="quiz-page">
      <div className="top-right-auth">
        {!user ? (
          <>
            <button onClick={() => navigate("/register")}>Signup</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        ) : (
          <div className="user-profile">
            <span>👤 {user.username || "User"}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <h1 className="quiz-heading">Welcome to Web Quiz</h1>

      <div className="quiz-container">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-box">
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <button className="start-button" onClick={() => handleStart(quiz.id)}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
