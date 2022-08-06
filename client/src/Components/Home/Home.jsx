import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import { getAllDogs, getTemperaments } from "../../Redux/actions";
import s from "./Home.module.css";
import Pagination from "./Pagination/Pagination";
import FilterOrder from "./FilterOrder/FilterOrder";
import SearchBar from "./SearchBar/SearchBar";

export default function Home() {
  const [order, setOrder] = useState("");
  let allDogs = useSelector((state) => state.allDogs);
  let alwaysAllDogs = useSelector((state) => state.alwaysAllDogs);
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    currentPage: 1,
    dogsPerPage: 8,
  });
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    resetPagination();
  }, []);

  if (allDogs.message) {
    setTimeout(() => {
      dispatch(getAllDogs());
      setPage({ ...page, currentPage: 1 });
    }, 2000);
    return (
      <>
        <div className={s.notFoundBack}></div>
        <h1 className={s.notFound}>{allDogs.message}</h1>
      </>
    );
  }
  const lastDog = page.currentPage * page.dogsPerPage;
  const firstDog = lastDog - page.dogsPerPage;
  const currentDogs = allDogs.slice(firstDog, lastDog);
  const paginado = (pageNumber) => {
    setPage({ ...page, currentPage: pageNumber });
  };
  const resetPagination = () => {
    setPage({ ...page, currentPage: 1 });
  };

  return (
    <div>
      <SearchBar page={page} paginado={paginado} />
      <FilterOrder
        page={page}
        setPage={setPage}
        setOrder={setOrder}
        temperaments={temperaments}
        alwaysAllDogs={alwaysAllDogs}
        resetPagination={resetPagination}
      />
      {allDogs.length ? (
        <Pagination
          dogsPerPage={page.dogsPerPage}
          currentPage={page.currentPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      ) : (
        <div className={s.loader}></div>
      )}
      <div className={s.container}>
        {currentDogs?.map((dog) => {
          return (
            <Card
              name={dog.name}
              key={dog.id}
              id={dog.id}
              image={dog.image}
              temperament={
                dog.temperaments
                  ? dog.temperaments.map((t) => t.name)
                  : dog.temperament
              }
              life_span={dog.life_span}
              weight={dog.weight}
              height={dog.height}
            />
          );
        })}
      </div>
    </div>
  );
}
