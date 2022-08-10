import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByTemperament, filterByBreed, filterByOrigin, orderByName, orderByWeight } from "../../../Redux/actions";
import { getAllDogs } from "../../../Redux/actions";
import s from './FilterOrder.module.css';

export default function Filter_Order ({temperaments, alwaysAllDogs, resetPagination}) {
    
    const dispatch = useDispatch()
    const [select, setSelect] = useState({
        orderName:'A-Z',
        weight: '-',
        temperament: 'all',
        breed:'all',
        origin:'all'
    })

    const handleFilterTemperament = e =>{
        dispatch(filterByTemperament(e.target.value))
        resetPagination()
        setSelect({...select, [e.target.name]: e.target.value})
    }
    const handleFilterBreed = e =>{
        resetPagination()
        dispatch(filterByBreed(e.target.value))
        setSelect({...select, [e.target.name]: e.target.value})
    }
    const handleFilterOrigin = e => {
        resetPagination()
        dispatch(filterByOrigin(e.target.value))
        setSelect({...select, [e.target.name]: e.target.value})
    }
    const handleOrderName = e =>{
        dispatch(orderByName(e.target.value))
        resetPagination()
        setSelect({...select, [e.target.name]: e.target.value})
    }
    const handleOrderWeight = e =>{
        resetPagination()
        dispatch(orderByWeight(e.target.value))
        setSelect({...select, [e.target.name]: e.target.value})
    }
    const handleReset = ()=>{
        dispatch(getAllDogs())
        resetPagination()
        setSelect({
            orderName:'A-Z',
            weight: '-',
            temperament: 'all',
            breed:'all',
            origin:'all'
        })
    }
    return (
        <>
        <button onClick={handleReset} className={s.btnReset}>Reset dogs</button>
        <section className={s.container}>
            <div>
                <h3>Order by:</h3>
                <select name="orderName" id="orderName" value={select.orderName} onChange={handleOrderName}>
                    <option value='A-Z'>A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select name="weight" id="weight" value={select.weight} onChange={handleOrderWeight}>
                    <option value='-'>Weight</option>
                    <option value="Mayor peso">Heavier</option>
                    <option value="Menor peso">Lighter</option>
                </select>
            </div>
            <div>
            <h3>Filter by:</h3>
                <span>Temperament</span>
                <select name="temperament" id="temperament" value={select.temperament} onChange={handleFilterTemperament}>
                    <option value="all">All</option>
                    {temperaments?.map(t=>{
                        return <option value={t.name} key={t.id}>{t.name}</option>
                    })}
                </select>
                <span>Breed</span>
                <select name="breed" id="breed" value={select.breed} onChange={handleFilterBreed}>
                    <option value="all">All</option>
                    {alwaysAllDogs?.map(dog=>{
                        return <option value={dog.name} key={dog.id}>{dog.name}</option>
                    })}
                </select>
                <span>Origin</span>
                <select name="origin" id="origin" value={select.origin} onChange={handleFilterOrigin}>
                    <option value="all">All</option>
                    <option value="API">API dogs</option>
                    <option value="created">Created dogs</option>
                </select>
            </div>
        </section>
        </>
    )
}