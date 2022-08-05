import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import Card from '../Card/Card';
import { getAllDogs, getTemperaments } from "../../Redux/actions";
import s from './Home.module.css';
import Pagination from "./Pagination/Pagination";
import FilterOrder from "./FilterOrder/FilterOrder";
import SearchBar from "./SearchBar/SearchBar";

export default function Home (){
    const [order, setOrder] = useState('')
    let allDogs = useSelector(state => state.allDogs);
    let alwaysAllDogs = useSelector(state=> state.alwaysAllDogs)
    const temperaments = useSelector(state => state.temperaments)
    const dispatch = useDispatch()
    const [page, setPage] = useState({
        currentPage:1,
        dogsPerPage:8
    })
    useEffect(()=>{
        dispatch(getAllDogs());
        dispatch(getTemperaments())
        .then(()=>{
            (function (){
            console.log('no entro al length todavia')
            console.log(allDogs)
            if(allDogs.length) {
                resetPagination()
            }
            })()
        })
    },[])
    
    document.body.className = s.body
    
    if(allDogs.message) {
        document.body.className = s.bodyNotFound
        setTimeout(()=>{
            dispatch(getAllDogs())
            setPage({...page,currentPage:1})
        }, 2000)
        return (
            <>
                <div className={s.notFoundBack}></div>
                <h1 className={s.notFound}>{allDogs.message}</h1>
            </>
            )
    }
    const lastDog = page.currentPage * page.dogsPerPage;
    const firstDog = lastDog - page.dogsPerPage;
    const currentDogs = allDogs.slice(firstDog, lastDog)
    const paginado = pageNumber =>{
        setPage({...page, currentPage: pageNumber})
    }
    const resetPagination = ()=>{
        setPage({...page,currentPage:1})
        let nextArrow = document.getElementsByClassName('next')[0]
        console.log('ejecuto la funcion')
        if(Math.ceil(allDogs.length/8)<5){
            console.log('entro al if de menor a 5')
            console.log(nextArrow)
            if(nextArrow) nextArrow.disabled = true
        } else{
            console.log('entro al else')
            console.log(allDogs.length)
            console.log(page.dogsPerPage)
            if(nextArrow) nextArrow.disabled = false
        }
    }

    const handleReset = ()=>{
        dispatch(getAllDogs())
        resetPagination()
        let filterTemp = document.querySelector('#temperament')
        filterTemp.value = 'all'
        let filterBreed = document.querySelector('#breed')
        filterBreed.value = 'all'
        let orderName = document.querySelector('#orderName')
        orderName.value = '-'
        let orderWeight = document.querySelector('#weight')
        orderWeight.value = '-'
    }
    return (
        <>
            <SearchBar 
                page={page} 
                setPage={setPage}
                resetPagination={resetPagination}
            />
            <button onClick={handleReset} className={s.btnReset}>Reset dogs</button>
            <FilterOrder 
                page={page}
                setPage={setPage}
                setOrder={setOrder}
                temperaments={temperaments}
                alwaysAllDogs={alwaysAllDogs}
                resetPagination={resetPagination}
            />
            <Pagination 
            dogsPerPage={page.dogsPerPage}
            page={page} 
            allDogs={allDogs.length} 
            paginado={paginado}
                />
                <div className={s.container}>
                {currentDogs?.map(dog =>{
                    return <Card
                        name={dog.name}
                        key={dog.id}
                        id={dog.id}
                        image={dog.image}
                        temperament= {dog.temperaments?dog.temperaments.map(t => t.name):dog.temperament}
                        life_span= {dog.life_span}
                        weight= {dog.weight}
                        height={dog.height}
                        />
                    })}
            </div>
        </>
    )
}
