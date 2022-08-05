import React from 'react';
import s from './Pagination.module.css';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

export default function Pagination ({ dogsPerPage, paginado, allDogs, page}){
    const pageNumber = [];
    for(let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i+1)
    }
    let btn = document.getElementsByClassName('movement')
    let moveDiv = document.getElementsByClassName('moveDiv')[0]
    let nextArrow = document.getElementsByClassName('next')[0]
    let prevArrow = document.getElementsByClassName('prev')[0]
    let prevPosition = Number(moveDiv?.style.transform.slice(11,-4))
    // setTimeout(()=>{
        if (btn[0]) {
        for(let i=0; i<btn.length; i++){
            if (Number(btn[i].name) === Number(page.currentPage)) {
                btn[i].style.backgroundColor ='rgb(106 61 90)';
            }
            else{
                btn[i].style.backgroundColor ='#C997C6'}
            }
        }
        if(prevPosition === 0) prevArrow.disabled = true
        
        // if(pageNumber.length < 5){
        //     if(nextArrow) nextArrow.disabled = true
        // } else{
        //     nextArrow.disabled = false
        // }
    // }, 5) 

    const move = btn => {
        if(btn === 'next'){
            prevArrow.disabled = false
            if(pageNumber.length === page.currentPage) return nextArrow.disabled = true
            paginado(page.currentPage+1)
            if(pageNumber.length > 4){
                if(page.currentPage>3){
                    if(prevPosition !== 0) {
                        let currentPosition = prevPosition - 2
                        if((prevPosition*-1)/2  === pageNumber.length - 5) nextArrow.disabled = true
                        return moveDiv.style.transform = `${moveDiv.style.transform.slice(0,11)}${currentPosition}rem)`
                }
                else moveDiv.style.transform = 'translateX(-2rem)'
                }
            // nextArrow.disabled = false
            }
            if(pageNumber.length-1 === page.currentPage) nextArrow.disabled = true
        } 
        if(btn === 'prev') {
            nextArrow.disabled = false
            page.currentPage > 1 && paginado(page.currentPage-1)
            if(moveDiv.style.transform !== 'translateX(0rem)'){
                if(moveDiv.style.transform){
                    let currentPosition = Number(prevPosition) + 2
                    moveDiv.style.transform = `${moveDiv.style.transform.slice(0,11)}${currentPosition}rem)`
                    if(currentPosition === 0) prevArrow.disabled = true
                }
            }
        }

    }
    return (
        <section className={s.arrowContainer}>
            <button className={`${s.arrow} prev`} onClick={()=>move('prev')}><MdOutlineArrowBackIosNew/></button> 
                <section className={s.container}>
                    <div className={`${s.movement} moveDiv`}>
                    {pageNumber.length && pageNumber.map(page=>{
                        return (
                        <button onClick={()=>{
                            paginado(page)
                            }} 
                            name={page}
                            key={page} 
                            className={`movement ${s.number}`}>
                        {page}
                        </button>)
                    })}
                    </div>
                </section>
                <button className={`${s.arrow} next`} onClick={()=>move('next')}><MdOutlineArrowForwardIos/></button>
        </section>
    )
    
}