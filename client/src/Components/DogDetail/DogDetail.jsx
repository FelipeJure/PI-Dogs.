import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteDog } from "../../Redux/actions";
import s from './DogDetail.module.css'

export default function DogDetail (){
    const [dog, setDog] = useState(undefined);
    const dispatch = useDispatch()
    const history = useHistory()
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

    const handleEdit = () => {
        history.push(`/editDog/${id}`);
    }

    const handleDelete = () => {
        dispatch(deleteDog(id))
        history.push("/home");
    }
    if (dog === undefined){
        return <div className={s.loader}></div> 
    } else if (dog === null || dog.message){
        return <h1>{dog.message}</h1>
    }else if(dog) {
        return (
            <section className={s.container}>
                <aside className={s.description}>
                {dog.temperaments?<button onClick={handleEdit} className={s.editBtn}>Edit dog</button>: null}
                    {dog.temperaments?<button onClick={handleDelete} className={s.deleteBtn}>Delete dog</button>: null}
                    <h1>{dog.name}</h1>
                    <p>Weight: <b>{dog.weight} kg</b></p>
                    <p>Height: <b>{dog.height} cm</b></p>
                    <p>Life Span: <b>{dog.life_span}</b></p>
                    <p>Temperament: <b>{dog.temperament?.join(', ')}</b></p>
                </aside>
                <img src={dog.image?dog.image:'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'} alt="Dog not found"/>
            </section>
        )
    }
}