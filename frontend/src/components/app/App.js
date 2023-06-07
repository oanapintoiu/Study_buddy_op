import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../homeFeed/feed'
import CreateGroup from '../createGroup/createGroup';
import { useNavigate, Routes, Route } from "react-router-dom";
import UserProfileForm from '../userProfile/UserProfileForm';
import StudyGroup from '../studyGroup/StudyGroup';

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path='/groups/:groupId' element={<StudyGroup navigate={ useNavigate() }/>}/>
      <Route path="/posts" element={<Feed navigate={navigate} />} />
      <Route path="/login" element={<LoginForm navigate={navigate} />} />
      <Route path="/signup" element={<SignUpForm navigate={navigate} />} />
      <Route path="/create-group" element={<CreateGroup navigate={navigate} />} />
      <Route path='/profile' element={<UserProfileForm navigate={ useNavigate() }/>}/>
    </Routes>
  );
}

export default App;
