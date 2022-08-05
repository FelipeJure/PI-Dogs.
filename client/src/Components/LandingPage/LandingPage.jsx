import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage (){
    document.body.className = s.body
    return (
    <section className={s.container}>
        <Link to='/home'>
            <button className={s.btn}>Know the dogs</button>
        </Link>
    </section>
    )
}