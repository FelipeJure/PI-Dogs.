import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { getDog } from "../../../Redux/actions";
import s from './SearchBar.module.css';
import { GoSearch } from 'react-icons/go';

export default function SearchBar ({ resetPagination }){
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const changeName = (e) => {
        setInput(e.target.value)
    }
    const onSearch = (e) => {
        e.preventDefault()
        if(input !== ''){
            dispatch(getDog(input))
            .then(()=>resetPagination())
            setInput('')
        }
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