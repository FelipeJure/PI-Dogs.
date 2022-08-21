import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, editDog } from "../../Redux/actions";
import { MdPets } from "react-icons/md";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";
import s from "./EditDog.module.css";
import Response from "../CreateDog/Response/Response";
import validation from "./validationEditFcn";

export default function EditDog() {
  const { id } = useParams();
  const [dog, setDog] = useState(undefined);
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperament] = useState([]);
  const [input, setInput] = useState({
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLife_span: "",
    maxLife_span: "",
    image: "",
    // userId,
    temperament: [],
    id: id ? id : null,
  });
  const [errors, setErrors] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    dispatch(getTemperaments());
    axios
      .get(`/dogs/${id}`)
      .then((res) => res.data)
      .then((dog) => {
        setDog(dog);
      })
      .catch((error) => {
        setDog(null);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    validateSubmitButton();
  }, [input, temperament]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
        errors,
        dog
      )
    );
  };
  const addTemperament = (e) => {
    if (
      e.target.value !== "-" &&
      !input.temperament.find((t) => t === Number(e.target.value))
    ) {
      setInput({
        ...input,
        temperament: [...input.temperament, Number(e.target.value)],
      });
      setTemperament(() => {
        return [
          ...temperament,
          { name: e.target.options[e.target.value].text, id: e.target.value },
        ];
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDog(input));
    setShowResponse(true);
    setTimeout(() => {
      setInput({
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLife_span: "",
        maxLife_span: "",
        image: "",
        id: "",
        // userId,
        temperament: [],
      });
      setTemperament([]);
      setShowResponse(false);
      history.push("/home");
    }, 2000);
  };
  const discartTemperament = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== Number(e.target.id)),
    });
    setTemperament(temperament.filter((t) => t.id !== e.target.id));
  };

  const validateSubmitButton = () => {
    if (
      (errors.minHeight === "" || !errors.minHeight) &&
      (errors.maxHeight === "" || !errors.maxHeight) &&
      (errors.minWeight === "" || !errors.minWeight) &&
      (errors.maxWeight === "" || !errors.maxWeight) &&
      (errors.minLife_span === "" || !errors.minLife_span) &&
      (errors.maxLife_span === "" || !errors.maxLife_span)
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const override = {
    display: "block",
    paddingTop: "40vh",
    paddingLeft: "50%",
    borderColor: "black",
  };

  if (dog === undefined) {
    return (
      <div className="sweet-loading">
        <PropagateLoader
          color="black"
          loading={true}
          cssOverride={override}
          size={20}
        />
      </div>
    );
  } else if (dog === null || dog.message) {
    return <h1>{dog.message}</h1>;
  } else if (dog) {
    return (
      <>
        <div className={s.two}>
          <section className={s.previus}>
            <h1 className={s.title}>Previus</h1>
            <div className={s.container}>
              <aside className={s.description}>
                <h1>{dog.name}</h1>
                <p>
                  Height: <b>{dog.height} cm</b>
                </p>
                <p>
                  Weight: <b>{dog.weight} kg</b>
                </p>
                <p>
                  Life Span: <b>{dog.life_span}</b>
                </p>
                <p>Temperament: </p>
                <div>{dog.temperament.join(", ")}</div>
              </aside>
              <img
                src={
                  dog.image
                    ? dog.image
                    : "https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png"
                }
                alt="Dog"
              />
            </div>
          </section>
          <section className={s.current}>
            <h1 className={s.title}>Current</h1>
            <form onSubmit={handleSubmit} className={s.form}>
              <br />
              <div>
                <label>Name: </label>
                <h4>{dog.name}</h4>
              </div>
              <br />
              <div>
                <label>Height: </label>
                <input
                  name="minHeight"
                  type="number"
                  onChange={handleChange}
                  id="minHeight"
                  className={errors.minHeight ? s.inputError : null}
                  value={input.minHeight}
                />
                <span> - </span>
                <input
                  name="maxHeight"
                  type="number"
                  onChange={handleChange}
                  id="maxHeight"
                  className={errors.maxHeight ? s.inputError : null}
                  value={input.maxHeight}
                />
                <span> cm</span>
                {errors.minHeight ? (
                  <span className={s.error}>{errors.minHeight}</span>
                ) : errors.maxHeight ? (
                  <span className={s.error}>{errors.maxHeight}</span>
                ) : null}
              </div>
              <br />
              <div>
                <label>Weight: </label>
                <input
                  name="minWeight"
                  type="number"
                  onChange={handleChange}
                  id="minWeight"
                  className={errors.minWeight ? s.inputError : null}
                  value={input.minWeight}
                />
                <span> - </span>
                <input
                  name="maxWeight"
                  type="number"
                  onChange={handleChange}
                  id="maxWeight"
                  className={errors.maxWeight ? s.inputError : null}
                  value={input.maxWeight}
                />
                <span> kg</span>
                {errors.minWeight ? (
                  <span className={s.error}>{errors.minWeight}</span>
                ) : errors.maxWeight ? (
                  <span className={s.error}>{errors.maxWeight}</span>
                ) : null}
              </div>
              <br />
              <div>
                <label>Life span: </label>
                <input
                  name="minLife_span"
                  type="number"
                  onChange={handleChange}
                  id="minLife_span"
                  className={errors.minLife_span ? s.inputError : null}
                  value={input.minLife_span}
                />
                <span> - </span>
                <input
                  name="maxLife_span"
                  type="number"
                  onChange={handleChange}
                  id="maxLife_span"
                  className={errors.maxLife_span ? s.inputError : null}
                  value={input.maxLife_span}
                />
                <span> years</span>
                {errors.minLife_span ? (
                  <span className={s.error}>{errors.minLife_span}</span>
                ) : errors.maxLife_span ? (
                  <span className={s.error}>{errors.maxLife_span}</span>
                ) : null}
              </div>
              <br />
              <label>Image: </label>
              <input name="image" onChange={handleChange} value={input.image} />
              <br />
              <div>
                <label>Temperament:</label>
                <select
                  name="temperament"
                  id="temperament"
                  onChange={addTemperament}
                >
                  <option value="-"> - </option>
                  {temperaments.map((t) => {
                    return (
                      <option key={t.id} value={t.id} name={t.name}>
                        {t.name}
                      </option>
                    );
                  })}
                </select>
                <div className={s.containerTemps}>
                  {temperament.length
                    ? temperament.map((t) => {
                        return (
                          <div
                            key={t.id}
                            className={s.temperamentGroup}
                            onClick={discartTemperament}
                          >
                            <span className={s.temperaments} id={t.id}>
                              {t.name}
                            </span>
                            <span className={s.x} id={t.id}>
                              x
                            </span>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <button
                type="submit"
                id="submit"
                className={s.submit}
                disabled={disableBtn}
              >
                <MdPets />
              </button>
            </form>
            <h4>*Complete only the inputs that you want to change</h4>
          </section>
        </div>
        <div className={showResponse ? s.visible : s.hidden}>
          <Response response={"Dog succesfully modified"} />
        </div>
      </>
    );
  }
}
