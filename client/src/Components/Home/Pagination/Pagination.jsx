import React, { useState } from "react";
import s from "./Pagination.module.css";
import { IoPlayOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";

export default function Pagination({ dogsPerPage, paginado, allDogs, currentPage }) {
  const [pageNumberLimit, setpageNumberLimit] = useState(4);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [status, setStatus] = useState({
    btnPrev: false,
    btnNext: false,
  });

  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  const handlePrev = (double) => {
      console.log(minPageNumberLimit-pageNumberLimit)
    if (double) {
      paginado(
        currentPage - pageNumberLimit
      );
      minPageNumberLimit - pageNumberLimit <= 0 && setStatus({...status, btnPrev:true});
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setStatus({ ...status, btnNext: false });
      return;
    }
    paginado(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      if(minPageNumberLimit - pageNumberLimit <= 0) setStatus({...status, btnPrev:true});
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setStatus({ ...status, btnNext: false });
    }
// if(allDogs===0) setStatus({...status, btnPrev:true})
  };

  const handleNext = (double) => {
    if (double) {
      paginado(
        currentPage + pageNumberLimit > pageNumber.length
          ? pageNumber.length
          : currentPage + pageNumberLimit
      );
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setStatus({...status, btnPrev:false});
      pageNumber.length < maxPageNumberLimit + pageNumberLimit &&
        setStatus({ ...status, btnNext: true });
      return;
    }
    paginado(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setStatus({...status, btnPrev:false});
      pageNumber.length < maxPageNumberLimit + pageNumberLimit &&
        setStatus({ ...status, btnNext: true });
    }
  };

  return (
      <section className={s.arrowContainer}>
        {minPageNumberLimit >= 1 ? (
        <button className={s.arrow} onClick={() => handlePrev(true)} disabled={status.btnPrev}>
          <IoPlayBackOutline />
        </button>
        )
        :
        <button
          className={`${s.arrow} ${s.left}`}
          disabled={true}
        >
          <IoPlayOutline />
        </button>} 
      {minPageNumberLimit >= 1 ? (
        <button
          className={`${s.arrow} ${s.left}`}
          onClick={() => handlePrev(false)}
          disabled={status.btnPrev}
        >
          <IoPlayOutline />
        </button>
      )
       : 
       <button
          className={`${s.arrow} ${s.left}`}
          disabled={true}
        >
          <IoPlayOutline />
        </button>} 
      <div className={s.movement}>
        {pageNumber.length &&
          pageNumber.map((number) => {
            if (
              number < maxPageNumberLimit + 1 &&
              number > minPageNumberLimit
            ) {
              return (
                <button
                  key={number}
                  id={number}
                  onClick={() => paginado(number)}
                  className={currentPage === number ? `${s.number} ${s.active}` : s.number}
                >
                  {number}
                </button>
              );
            } else {
              return null;
            }
          })}
      </div>

      <button
        className={s.arrow}
        onClick={() => handleNext(false)}
        disabled={status.btnNext}
      >
        <IoPlayOutline />
      </button>
      <button
        className={s.arrow}
        onClick={() => handleNext(true)}
        disabled={status.btnNext}
      >
        <IoPlayForwardOutline />
      </button>
    </section>
  );
}
