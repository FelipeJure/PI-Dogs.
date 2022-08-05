import React from "react";
import s from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card ({name, id, image, temperament, weight }){
    return (
        <Link to={`/dogs/${id}`}>
            <div className={`${s.container}`}>
                <div className={`${s.flipFace} ${s.front}`}>
                    <img src={image? image:'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="imagen" />
                </div>
                <div className={`${s.flipFace} ${s.back}`}>
                    <h2>{name}</h2>
                    <p>Weight: {weight}kg</p>
                    <p>Temperament: {temperament?.join(', ')}</p>
                </div>
            </div>
        </Link>
    )
}