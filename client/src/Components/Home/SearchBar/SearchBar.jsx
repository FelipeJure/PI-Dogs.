import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { getDog } from "../../../Redux/actions";
import s from './SearchBar.module.css';
import { GoSearch } from 'react-icons/go';

export default function SearchBar ({ setPage, page, resetPagination }){
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const changeName = (e) => {
        setInput(e.target.value)
    }
    let moveDiv = document.getElementsByClassName('moveDiv')[0]
    const onSearch = (e) => {
        e.preventDefault()
        dispatch(getDog(input))
        .then(() => resetPagination())
        setInput('')
        if(moveDiv) moveDiv.style.transform = 'translateX(0rem)'
    }
    return (
        <form className={s.container}> 
            <input 
                type="text" 
                placeholder="Search dog..." 
                className={s.input}
                value={input}
                onChange={changeName}
            />
                <button className={s.btn} onClick={onSearch}> 
                    <GoSearch/>
                </button>
    </form>
    )
}