import React from "react";
import { Link } from "react-router-dom";
import image from '../../images/pngwing.com.png'
import sound from '../../images/Blue-remix.mp3'
// import { useState, useEffect } from "react";
import LandingCSS from './Landing.module.css' 

export default function Landing({play}){
    var sonido = new Audio()
    sonido.src = sound;



    return (
        <div className={LandingCSS.content}>
            <h1 className={LandingCSS.text}>FIND YOUR PERRITO</h1>
            

            <button onClick={() => play()} className={LandingCSS.button}>
                <Link to='/home'><img src={image} className={LandingCSS.buttonImg}/></Link>
            </button>
        </div>
    )
}