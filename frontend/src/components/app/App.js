import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../homeFeed/feed'
import CreateGroup from '../createGroup/createGroup';
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/posts" element={<Feed navigate={navigate} />} />
      <Route path="/login" element={<LoginForm navigate={navigate} />} />
      <Route path="/signup" element={<SignUpForm navigate={navigate} />} />
      <Route path="/create-group" element={<CreateGroup navigate={navigate} />} />
    </Routes>
  );
}

export default App;
