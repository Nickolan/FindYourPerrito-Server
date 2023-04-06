import React from "react";
import { useState } from 'react';
import { findDogs } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import SearchStyle from './SearchBar.module.css'


export default function SearchBar({setPaginaActual}){

    const dispatch = useDispatch()

    const [dogs, setDogs] = useState('')
    const handleChange = (event) => {
        //console.log(dogs);
        setDogs(event.target.value)
    }
    const handleSearch = () => {
        dispatch(findDogs(dogs))
        setPaginaActual(1)
        setDogs('')
    }

    return (
        <div className={SearchStyle.allBar}>
            <input className={SearchStyle.searchBar} placeholder="Search by Name" type="text" value={dogs} onChange={handleChange}/>
            <button className={SearchStyle.button} onClick={handleSearch}>🔍</button>
        </div>
    )
}