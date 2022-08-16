import React, { useState } from "react";
import s from "./Pagination.module.css";
import { IoPlayOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";

export default function Pagination({ dogsPerPage, paginado, allDogs, currentPage,maxPageNumberLimit, setmaxPageNumberLimit, minPageNumberLimit, setminPageNumberLimit }) {
  const pageNumberLimit = 4;
  const [statusBtnNext, setStatusBtnNext] = useState(false);

  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  const handlePrev = (double) => {
    if (double) {
      paginado(
        currentPage - pageNumberLimit
      );
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setStatusBtnNext(false);
      return;
    }
    paginado(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setStatusBtnNext(false);
    }
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
      pageNumber.length < maxPageNumberLimit + pageNumberLimit &&
        setStatusBtnNext(true);
      return;
    }
    paginado(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      pageNumber.length < maxPageNumberLimit + pageNumberLimit &&
        setStatusBtnNext(true);
    }
  };

  return (
      <section className={s.arrowContainer}>
        {minPageNumberLimit >= 1 ? (
          <>
            <button className={s.arrow} onClick={() => handlePrev(true)} >
              <IoPlayBackOutline />
            </button>
            <button
              className={`${s.arrow} ${s.left}`}
              onClick={() => handlePrev(false)}
              >
              <IoPlayOutline />
            </button>
          </>
        )
        :
        <>
          <button
            className={`${s.arrow} ${s.left}`}
            disabled
            >
            <IoPlayOutline />
          </button>
          <button
            className={`${s.arrow} ${s.left}`}
            disabled
            >
            <IoPlayOutline />
          </button>
        </>
        }
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
    {pageNumber?.length <= maxPageNumberLimit?
      <>
      <button
      className={s.arrow}
        disabled
      >
        <IoPlayOutline />
      </button>
      <button
      className={s.arrow}
      disabled
      >
        <IoPlayForwardOutline />
      </button>
      </>
      :
    <>
      <button
      className={s.arrow}
        onClick={() => handleNext(false)}
        disabled={statusBtnNext}
      >
        <IoPlayOutline />
      </button>
      <button
      className={s.arrow}
      onClick={() => handleNext(true)}
      disabled={statusBtnNext}
      >
        <IoPlayForwardOutline />
      </button>
      </>
      }
    </section>
  );
}
