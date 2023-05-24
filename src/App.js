import React, { useEffect } from 'react';
import "./App.scss"
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { About, Dashboard, ManageExercise, ManageFood, ManageIngredient, ManageUser } from './pages';
import Login from './pages/LG/Login';

const App = () => {


  let  logger =  (localStorage.getItem("JWT"));
  
  return (
    <div>
      <BrowserRouter>
        {logger ? (
          <Sidebar >
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/manageExercise' element={<ManageExercise />} />
              <Route path='/manageFood' element={<ManageFood />} />
              <Route path='/manageIngredient' element={<ManageIngredient />} />
              <Route path='/manageUser' element={<ManageUser />} />
            </Routes>
          </Sidebar>
        ) : (<Routes>
          <Route path='/login' element={<Login />} />
        </Routes>)}
      </BrowserRouter>
    </div >
  );
}

export default App;