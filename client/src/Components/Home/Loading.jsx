import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Loading.css";
import yogaIMG from '../../Images/yoga.png';

export const Loading = () => {
  const [time, setTime] = useState(false);
  const [broken, setBroken] = useState(false);
  const [isMounted, setIsMounted] = useState(true); // Variable de estado para rastrear si el componente está montado

  useEffect(() => {
    let timeoutId1;
    let timeoutId2;

    timeoutId1 = setTimeout(() => {
      if (isMounted) {
        setTime(true);
      }
    }, 5000);

    timeoutId2 = setTimeout(() => {
      if (isMounted) {
        setTime(false);
        setBroken(true);
      }
    }, 60000);

    return () => {
      setIsMounted(false); // Marca el componente como desmontado al limpiar el efecto
      clearTimeout(timeoutId1); // Limpia el temporizador 1 al desmontar el componente
      clearTimeout(timeoutId2); // Limpia el temporizador 2 al desmontar el componente
    };
  }, [isMounted]);

  const override = {
    display: "list-item",
    color: "transparent",
    marginLeft: "50%",
    transform: "translateX(-0.5rem)",
    borderColor: "black",
  };

  return (
    <div className="loader">
      { !broken && (
      <div className="sweet-loading">
        <PropagateLoader
          color="black"
          loading={true}
          cssOverride={override}
          size={20}
        />
      </div>
      )}
      {!!time && (
        <div className="textLoader">
          <span >Espera un momento y respira hondo!</span>
          <img className="imgYoga" src={yogaIMG} alt="wait a minute please" />
          <span className="subTextLoader">
            Esta aplicación está alojada en un hosting gratuito y los tiempos
            de carga son un poco más lentos. 🕔 
            <br />
            <br />
            Te invito a esperar unos segundos más para descubrir el
            funcionamiento de la aplicación 😅 
          </span>
        </div>
      )}
      {!!broken && (
        <>
          <span className="textLoader">Ups!</span>
          {/* <img className="imgLoader" src={emoji1} alt="not found" /> */}
          <span className="subTextLoader">
            Parece que algo no anda bien...
            <br />
            <br />
            Gracias por la paciencia, por favor contáctame para que pueda
            solucionarlo.
          </span>
        </>
      )}
    </div>
  );
};
