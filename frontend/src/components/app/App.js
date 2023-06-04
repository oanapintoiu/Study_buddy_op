import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import UserProfileForm from '../userProfile/UserProfileForm'
import React, { useState } from 'react';
import StudyGroup from '../studyGroup/StudyGroup'

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/groups/:groupId' element={<StudyGroup navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/profile' element={<UserProfileForm navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
