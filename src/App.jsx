// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Quiz from "./Quiz";
import QuizQuestions from "./QuizQuestions";
import { AuthProvider } from "./AuthContext"; // ✅ NEW

function App() {
  return (
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
