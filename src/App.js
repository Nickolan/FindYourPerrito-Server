import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home'
import Form from './components/Form/Form';
import sound from './images/ladrido.mp3'
import backcry from './images/perrocry.mp3'

function App() {

  var sonido = new Audio()
  sonido.src = sound;

  var cry = new Audio();
  cry.src = backcry;

  const play = () => {
    sonido.play();
  }

  const back = () => {
    cry.play();
  }

  return (
    <div className={"App"}>
      <Routes>
        <Route path='/' element={<Landing play={play} />}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/create' element={<Form back={back} play={play}/>}/>
      </Routes>
    </div>
  );
}

export default App;
