// importing react and component from react router
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup"; //for signup component
import Login from "./Login"; // for login component
import Quiz from "./Quiz"; // for quiz component
import QuizQuestions from "./QuizQuestions"; // for quiz question component
import { AuthProvider } from "./AuthContext"; //  for authentication

function App() {
  return (   // wrapping all components
    <AuthProvider>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<div>Please select a topic to begin the quiz.</div>} />
          <Route path="/quiz/:topic" element={<QuizQuestions />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
