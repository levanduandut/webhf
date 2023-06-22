import React, { useEffect } from 'react';
import "./App.scss"
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { About, Dashboard, ManageBlog, ManageExercise, ManageFood, ManageIngredient, ManageSick, ManageUser } from './pages';
import Login from './pages/LG/Login';

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
          <Sidebar >
            <Routes>
              <Route path='*' element={<About />} />
              <Route path='/about' element={<About />} />
              <Route path='/manageExercise' element={<ManageExercise />} />
              <Route path='/manageFood' element={<ManageFood />} />
              <Route path='/manageIngredient' element={<ManageIngredient />} />
              <Route path='/manageUser' element={<ManageUser />} />
              <Route path='/manageBlog' element={<ManageBlog />} />
              <Route path='/manageSick' element={<ManageSick />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Sidebar>
      </BrowserRouter>
    </div >
  );
}

export default App;