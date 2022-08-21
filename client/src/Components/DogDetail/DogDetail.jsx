import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import { deleteDog } from "../../Redux/actions";
import PropagateLoader from "react-spinners/PropagateLoader";
import swal from "sweetalert";
import Response from "../CreateDog/Response/Response";
import s from "./DogDetail.module.css";

export default function DogDetail() {
  const [dog, setDog] = useState(undefined);
  const [showResponse, setShowResponse] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/dogs/${id}`)
      .then((res) => res.data)
      .then((dog) => {
        setDog(dog);
      })
      .catch((error) => {
        setDog(null);
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    history.push(`/editDog/${id}`);
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this dog!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteDog(id));
        setShowResponse(true);
        setTimeout(() => {
          setShowResponse(false);
          history.push("/home");
        }, 2000);
      } else {
        swal("This dog is safe!");
      }
    });
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
      <section className={s.container}>
        <aside className={s.description}>
          {dog.temperaments ? (
            <button onClick={handleEdit} className={s.editBtn}>
              Edit dog
            </button>
          ) : null}
          {dog.temperaments ? (
            <button onClick={handleDelete} className={s.deleteBtn}>
              Delete dog
            </button>
          ) : null}
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
          <p>
            Temperament: <b>{dog.temperament?.join(", ")}</b>
          </p>
        </aside>
        <img
          className={s.imgDog}
          src={
            dog.image
              ? dog.image
              : "https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png"
          }
          alt="Dog not found"
        />
        <div className={showResponse ? s.show : s.hidden}>
          <Response response={"Dog succesfully removed"} />
        </div>
      </section>
    );
  }
}
