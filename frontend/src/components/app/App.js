import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import UserProfileForm from '../userProfile/UserProfileForm'
import React, { useState } from 'react';

import Sidebar from '../sidebar/Sidebar'

import Feed from '../homeFeed/feed'
import CreateGroup from '../createGroup/createGroup';
import { useNavigate, Routes, Route } from "react-router-dom";
import StudyGroup from '../studyGroup/StudyGroup';

const App = () => {
  const navigate = useNavigate();
    return (
      <>
      <Sidebar/>
      <div className="app-body">
        <Routes>
          <Route path="/posts" element={<Feed navigate={navigate} />} />
          <Route path='/groups/:groupId' element={<StudyGroup navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path="/create-group" element={<CreateGroup navigate={navigate} />} />
          <Route path='/profile' element={<UserProfileForm navigate={ useNavigate() }/>}/>
        </Routes>
        </div>
      </>
    );
}

export default App;
