import React from "react";
import s from './PreviewDog.module.css'

export default function PreviewDog ({ name, weight, height, image, temperament, life_span }) {
    return (
        <section className={s.container}>
                <aside className={s.description}>
                    <h1>{name}</h1>
                    <p>Height: <b>{height} cm</b></p>
                    <p>Weight: <b>{weight} kg</b></p>
                    <p>Life Span: <b>{life_span}</b></p>
                    <p>Temperament: </p>
                    <div>{temperament.join(', ')}</div>
                </aside>
                <img src={image?image:'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="Dog"/>
            </section>
    )
}