import React from "react";
import { ImHome3 } from 'react-icons/im';
import { Link } from "react-router-dom";
import s from './Navbar.module.css';

export default function Navbar (){
    return (
        <nav className={s.navbar}>
            <Link to='/home'>
                <ImHome3 className={s.home}/>
            </Link>
            <Link to='/createDog' className={s.create}>
                <h3>Create Dog</h3>
            </Link>
        </nav>
    )
}