import React from "react";
import { useDispatch } from "react-redux";
import { filterByTemperament, filterByBreed, orderByName, orderByWeight } from "../../../Redux/actions";
import s from './FilterOrder.module.css';

export default function Filter_Order ({temperaments, alwaysAllDogs, page, setPage, setOrder, resetPagination}) {
    
    const dispatch = useDispatch()
    // let moveDiv = document.getElementsByClassName('moveDiv')[0]

    const handleFilterTemperament = e =>{
        dispatch(filterByTemperament(e.target.value))
        // if(moveDiv) moveDiv.style.transform = 'translateX(0rem)'
        resetPagination()
    }
    const handleFilterBreed = e =>{
        setPage({...page, currentPage:1})
        dispatch(filterByBreed(e.target.value))
        // if(moveDiv) moveDiv.style.transform = 'translateX(0rem)'
    }
    const handleOrderName = e =>{
        dispatch(orderByName(e.target.value))
        setPage({...page, currentPage:1})
        setOrder(`Ordenado por ${e.target.value}`)
    }
    const handleOrderWeight = e =>{
        setPage({...page, currentPage:1})
        dispatch(orderByWeight(e.target.value))
        setOrder(`Ordenado por ${e.target.value}`)
    }
    return (
        <section className={s.container}>
            <div>
                <h3>Order by:</h3>
                <select name="orderName" id="orderName" onChange={handleOrderName}>
                    <option value='A-Z'>A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select name="weight" id="weight" onChange={handleOrderWeight}>
                    <option value='-'>Weight</option>
                    <option value="Mayor peso">Heavier</option>
                    <option value="Menor peso">Lighter</option>
                </select>
            </div>
            <div>
            <h3>Filter by:</h3>
                <span>Temperament</span>
                <select name="temperament" id="temperament" onChange={handleFilterTemperament}>
                    <option value="all">All</option>
                    {temperaments?.map(t=>{
                        return <option value={t.name} key={t.id}>{t.name}</option>
                    })}
                </select>
                <span>Breed</span>
                <select name="breed" id="breed" onChange={handleFilterBreed}>
                    <option value="all">All</option>
                    {alwaysAllDogs?.map(dog=>{
                        return <option value={dog.name} key={dog.id}>{dog.name}</option>
                    })}
                </select>
            </div>
        </section>
    )
}