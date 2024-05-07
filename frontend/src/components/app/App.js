import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import UserProfileForm from '../userProfile/UserProfileForm'
import Budy from '../budy/Budy'
import React, { useEffect, useState } from 'react';

import Sidebar from '../sidebar/Sidebar'

import Feed from '../homeFeed/feed'
import CreateGroup from '../createGroup/createGroup';
import { useNavigate, Routes, Route } from "react-router-dom";
import StudyGroup from '../studyGroup/StudyGroup';

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    setToken(window.localStorage.getItem("token"))
  })
    return (
      <>

<div className="App">

</div>
      
      {token ? <Sidebar navigate={navigate}/>: null}
      <div className="app-body">
        <Routes>
        <Route path='/'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path="/posts" element={<Feed navigate={navigate} />} />
          <Route path='/groups/:groupId' element={<StudyGroup navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path="/create-group" element={<CreateGroup navigate={navigate} />} />
          <Route path='/profile' element={<UserProfileForm navigate={ useNavigate() }/>}/>
          <Route path='/users/:id' element={<Budy navigate={ useNavigate() }/>}/>
        </Routes>
        </div>
      </>
    );
}

export default App;