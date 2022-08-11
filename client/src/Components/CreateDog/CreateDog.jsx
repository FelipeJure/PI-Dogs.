import React, { useEffect, useState } from "react";
import s from "./CreateDog.module.css";
import { getTemperaments, createDog, getAllDogs } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PreviewDog from "./PreviewDog/PreviewDog";
import { MdPets } from "react-icons/md";
import Response from "./Response/Response";

function validation(input, name, errors, repeated) {
  if (name !== "image") {
    if (repeated) return { ...errors, [name]: "This dog already exist" };
    if (input[name] === "")
      return { ...errors, [name]: "This input must be completed" };
    if (Number(input[name]) < 0)
      return { ...errors, [name]: "Can't put a negative number" };
    if (name.includes("max")) {
      let minValue = name.replace("max", "min");
      minValue = input[minValue];
      if (Number(input[name]) < minValue && minValue !== "")
        return { ...errors, [name]: `It must be more than ${minValue}` };
    }
    if (name.includes("min")) {
      let maxValue = name.replace("min", "max");
      maxValue = input[maxValue];
      if (Number(input[name]) > maxValue && maxValue !== "")
        return { ...errors, [name]: `It must be less than ${maxValue}` };
    }
  }
  return { ...errors, [name]: "" };
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperament] = useState([]);
  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLife_span: "",
    maxLife_span: "",
    image: "",
    // userId,
    temperament: [],
  });
  const [errors, setErrors] = useState({});
  const [boolean, setBoolean] = useState(true);
  const [showResponse, setShowResponse] = useState(false)
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getAllDogs());
  }, []);
  useEffect(()=>{
    validateSubmitButton()
  },[input,temperament])
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
        });
    let repeatedDog;
    if (e.target.name === "name")
      repeatedDog = allDogs.find(
        (dog) => dog.name.toLowerCase() === e.target.value.toLowerCase()
      );
    setErrors(validation(
            {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
        errors,
        repeatedDog
        ));
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
      ]});
    }
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(input));
    setInput({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      minLife_span: "",
      maxLife_span: "",
      image: "",
      // userId,
      temperament: [],
    });
    setTemperament([]);
    setShowResponse(true)
    setTimeout(() => {
      setShowResponse(false)
      history.push("/home");
    }, 2000);
  };
  const discartTemperament = (e) => {
    console.log(e.target.id);
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== Number(e.target.id)),
    });
    setTemperament(temperament.filter((t) => t.id !== e.target.id));
  };

  const validateSubmitButton = () => {
    if (
      errors.name !== "" ||
      errors.minHeight !== "" ||
      errors.maxHeight !== "" ||
      errors.minWeight !== "" ||
      errors.maxWeight !== "" ||
      errors.minLife_span !== "" ||
      errors.maxLife_span !== "" ||
      input.temperament.length === 0
    ) {
      setBoolean(true)
    } else {
      setBoolean(false);
    }
  };
  return (
    <section className={s.section}>
      <form onSubmit={handleSubmit} className={s.form}>
        <br />
        <div>
          <label>Name: </label>
          <input
            name="name"
            onChange={handleChange}
            value={input.name}
            className={errors.name ? s.inputError : null}
            autoComplete="off"
          ></input>
          {errors.name && <span className={s.error}>{errors.name}</span>}
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
          <select name="temperament" id="temperament" onChange={addTemperament}>
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
          disabled={boolean}
        >
          <MdPets />
        </button>
      </form>
      <PreviewDog
        name={
          input.name
            ? input.name[0].toUpperCase() + input.name[1]
              ? input.name[0].toUpperCase() +
                input.name.substring(1).toLowerCase()
              : input.name[0].toUpperCase()
            : null
        }
        // id={input.id}
        image={input.image}
        temperament={temperament.map((t) => t.name)}
        life_span={`${input.minLife_span} - ${input.maxLife_span} years`}
        weight={`${input.minWeight} - ${input.maxWeight}`}
        height={`${input.minHeight} - ${input.maxHeight}`}
      />
      <div className={ showResponse? s.show: s.hidden}>
        <Response />
      </div>
    </section>
  );
}
