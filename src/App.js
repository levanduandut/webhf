import React, { Component } from 'react';
import "./App.scss"
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Dashboard, ManageExercise, ManageFood, ManageUser } from './pages';
import Login from './pages/LG/Login';

class App extends Component {

  render() {
    let logger = false;
    return (
      <div>
        <BrowserRouter>
          {logger ? (
            <Sidebar>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/about' element={<About />} />
                <Route path='/manageExercise' element={<ManageExercise />} />
                <Route path='/manageFood' element={<ManageFood />} />
                <Route path='/manageUser' element={<ManageUser />} />
              </Routes>
            </Sidebar>
          ) : (<Routes>
            <Route path='/login' element={<Login />} />
          </Routes>)}
        </BrowserRouter>
      </div>
    );
  }

};

export default App;