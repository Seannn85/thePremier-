
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Page/Register';
import Nav from './Page/Nav';

import MainPage from './MainPage';





function App() {
  



  return (
    <>
     
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/' element={ <MainPage/>} />

     
    </Routes>
    </>
   
  );
}



export default App
