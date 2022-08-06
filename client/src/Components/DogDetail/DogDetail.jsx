import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import s from './DogDetail.module.css'

export default function DogDetail (){
    const [dog, setDog] = useState(undefined);
    const { id } = useParams()
    useEffect(()=>{
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(dog => {
            setDog (dog)
        })
        .catch (error => {
            setDog(null);
            console.log(error)
        })
    },[id])
    document.body.className = s.body
    if (dog === undefined){
        return <div className={s.loader}></div> 
    } else if (dog === null || dog.message){
        return <h1>{dog.message}</h1>
    }else if(dog) {
        if (dog.temperaments) dog.temperament = dog.temperaments.map(temp => temp.name)
        return (
            <section className={s.container}>
                <aside className={s.description}>
                    <h1>{dog.name}</h1>
                    <p>Weight: <b>{dog.weight} kg</b></p>
                    <p>Height: <b>{dog.height} cm</b></p>
                    <p>Life Span: <b>{dog.life_span}</b></p>
                    <p>Temperament: <b>{dog.temperament?.join(', ')}</b></p>
                </aside>
                <img src={dog.image?dog.image:'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="Dog"/>
            </section>
        )
    }
}