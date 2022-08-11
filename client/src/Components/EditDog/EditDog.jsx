import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from './EditDog.module.css'

export default function EditDog () {
    const { id } = useParams()
    const [dog, setDog] = useState(undefined)

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(dog => {
            setDog (dog)
        })
        .catch (error => {
            setDog(null);
            console.log(error)
        })
    }, [id])

    if (dog === undefined){
        return <div className={s.loader}></div> 
    } else if (dog === null || dog.message){
        return <h1>{dog.message}</h1>
    }else if(dog) {
    return (
        <div className={s.two}>
        <section className={s.previus}>
            <h1 className={s.title}>Previus</h1>
            <div className={s.container}>
                <aside className={s.description}>
                    <h1>{dog.name}</h1>
                    <p>Height: <b>{dog.height} cm</b></p>
                    <p>Weight: <b>{dog.weight} kg</b></p>
                    <p>Life Span: <b>{dog.life_span}</b></p>
                    <p>Temperament: </p>
                    <div>{dog.temperament.join(', ')}</div>
                </aside>
                <img src={dog.image? dog.image :'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="Dog"/>
            </div>
        </section>
        <section className={s.previus}>
            <h1 className={s.title}>Current</h1>
            <div className={s.container}>
                <aside className={s.description}>
                    <h1>{dog.name}</h1>
                    <p>Height: <b>{dog.height} cm</b></p>
                    <p>Weight: <b>{dog.weight} kg</b></p>
                    <p>Life Span: <b>{dog.life_span}</b></p>
                    <p>Temperament: </p>
                    <div>{dog.temperament.join(', ')}</div>
                </aside>
                <img src={dog.image? dog.image :'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="Dog"/>
            </div>
        </section>
        </div>
    )
    }
}