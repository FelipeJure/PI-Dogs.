import React from 'react';
import s from './Response.module.css';


export default function Response ({response}){

    if(response === 'Dog succesfully removed') {
        return (
            <section className={s.container}>
                <div className={s.group}>
                    <h1 className={s.textDeleted}> {response} </h1>
                    <img className={s.imgDeleted} src="https://mott.pe/noticias/wp-content/uploads/2016/07/Esto-es-lo-que-realmente-pasa-cuando-los-perros-lloran-01.jpg" alt="" />
                </div>
            </section>
        )
    }
    if(response === 'Dog succesfully modified'){
        return (
            <section className={s.container}>
                <div className={s.group}>
                    <h1 className={s.textEdited}> {response} </h1>
                    <img className={s.imgEdited} src="https://estaticos.muyinteresante.es/media/cache/1000x_thumb/uploads/images/gallery/5a3781335bafe818d42d1151/perro-mascara.jpg" alt="" />
                </div>
            </section>
        )
    }
    return (
        <section className={s.container}>
            <div className={s.group}>
                <h1 className={s.text}> Dog successfully created </h1>
                <img className={s.imgCreated} src="data:image/jpeg;base64,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" alt="" />
            </div>
        </section>
    )
}