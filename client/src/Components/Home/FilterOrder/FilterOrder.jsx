import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, filterByTemperament, filterByBreed, filterByOrigin, orderByName, orderByWeight, orderByHeight } from "../../../Redux/actions";
import s from './FilterOrder.module.css';

export default function Filter_Order ({temperaments, resetPagination, select, setSelect}) {
    const alwaysAllDogs = useSelector(state => state.alwaysAllDogs)
    const dispatch = useDispatch()

    const handleChange = e =>{
        if(e.target.name === 'orderName') dispatch(orderByName(e.target.value))
        if(e.target.name === 'weight') dispatch(orderByWeight(e.target.value))
        if(e.target.name === 'temperament') {
            dispatch(setLoading())
            dispatch(filterByTemperament(e.target.value))
        }
        if(e.target.name === 'breed') {
            dispatch(setLoading())
            dispatch(filterByBreed(e.target.value))
        }
        if(e.target.name === 'origin') {
            dispatch(setLoading())
            dispatch(filterByOrigin(e.target.value))
        }
        if(e.target.name === 'height') dispatch(orderByHeight(e.target.value))
        resetPagination()
        setSelect({...select, [e.target.name]: e.target.value})
    }

    return (
        <>
        <section className={s.container}>
            <div>
                <h3>Order by:</h3>
                <select name="orderName" id="orderName" value={select.orderName} onChange={handleChange}>
                    <option value='A-Z'>A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select name="weight" id="weight" value={select.weight} onChange={handleChange}>
                    <option value='-'>Weight</option>
                    <option value="Mayor peso">Heavier</option>
                    <option value="Menor peso">Lighter</option>
                </select>
                <select name="height" id="height" value={select.height} onChange={handleChange}>
                    <option value='-'>Height</option>
                    <option value="large">Large</option>
                    <option value="small">Small</option>
                </select>
            </div>
            <div>
                <h3>Filter by:</h3>
                <span>Temperament</span>
                <select name="temperament" id="temperament" value={select.temperament} onChange={handleChange}>
                    <option value="all">All</option>
                    {temperaments?.map(t=>{
                        return <option value={t.name} key={t.id}>{t.name}</option>
                    })}
                </select>
                <span>Breed</span>
                <select name="breed" id="breed" value={select.breed} onChange={handleChange}>
                    <option value="all">All</option>
                    {alwaysAllDogs?.map(dog=>{
                        return <option value={dog.name} key={dog.id}>{dog.name}</option>
                    })}
                </select>
                <span>Origin</span>
                <select name="origin" id="origin" value={select.origin} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="API">API dogs</option>
                    <option value="created">Created dogs</option>
                </select>
            </div>
        </section>
        </>
    )
}