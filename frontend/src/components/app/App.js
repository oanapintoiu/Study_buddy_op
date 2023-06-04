import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Sidebar from '../sidebar/Sidebar'

import Feed from '../homeFeed/feed'
import CreateGroup from '../createGroup/createGroup';
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
    return (
      <>
      <Sidebar/>
      <div className="app-body">
        <Routes>
          <Route path='/groups/:groupId' element={<StudyGroup navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path="/create-group" element={<CreateGroup navigate={navigate} />} />
        </Routes>
        </div>
      </>
    );
}

export default App;
