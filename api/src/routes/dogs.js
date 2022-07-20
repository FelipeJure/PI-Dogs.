const { Dog, Temperament } = require('../../src/db.js');
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const { text } = require('body-parser');
const { Op } = require('sequelize')

const callAllApiDogs = async () => {
    let dogs = await fetch('https://api.thedogapi.com/v1/breeds')
    return dogs = dogs.json()
}
const findApiDog = async (name) => {
    let apiDog = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    return apiDog = await apiDog.json()
}
const findDbDog = async (name) => {
    const dbDog = await Dog.findOne ({
        attributes:['id','name','image','height', 'weight', 'life_span'],
        where: {
            name
        }
    }, {
        include: Temperament
    })
    return dbDog
}
let idValue = 1000

router.get('/', async (req, res) =>{
    const { name } = req.query;
    if (name){
        let apiDogs = []
        let dogs = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        dogs = await dogs.json()
        if (dogs.length){
            apiDogs = dogs.map(dog => {
                return dog = {
                    name: dog.name,
                    id:dog.id,
                    temperament: dog.temperament,
                    life_span: dog.life_span,
                    weight: dog.weight.metric,
                    height: dog.height.metric
                }
            })
        }
        let dbDog = await Dog.findAll({
            attributes:['name', 'image', 'weight', 'id'],
            where:{
                name: {
                    [Op.substring]:name
                }
            }
        },{
            include: Temperament
        })
        if (dbDog.length) {
            dbDog = dbDog.map(dog => dog.toJSON())
            if(apiDogs.length) return res.json([...apiDogs,...dbDog])
            else return res.json(dbDog)
            }
        if(apiDogs.length) return res.json(apiDogs)
        return res.status(404).json({message: 'Dog not found'})
    }
    let apiDogs = []
    let createdDogs = []
    const calledDogs = await callAllDogs()
    apiDogs = calledDogs.map(dog => {
        return dog = {
            image: dog.image.url,
            name: dog.name,
            temperament:dog.temperament,
            weight:dog.weight.metric,
            id: dog.id
        }
    }) 
    let dbDogs = Dog.findAll({
        attributes:['name', 'image', 'weight', 'id']
    },{
        include: Temperament
    })
    if(dbDogs.length) createdDogs = dbDogs.map (r => r.toJSON());
    const allDogs = [...apiDogs, ...createdDogs]
    res.json(allDogs)
})

router.get('/:raza',async (req,res) => {
    const { raza } = req.params;
    const dbDog = findDbDog(raza)
    if (dbDog) return res.json(dbDog.toJSON())
    const apiDog = findApiDog(raza)
    if (apiDog[0]) {
        apiDog = {
            id: apiDog[0].id,
            name: apiDog[0].name,
            height: apiDog[0].height.metric,
            weight: apiDog[0].weight.metric,
            life_span: apiDog[0].life_span,
            temperament: apiDog[0].temperament
        }
        return res.json(apiDog)
    }
    return res.status(404).json({message: 'Dog not found'})
})

router.post('/', async (req,res) =>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, minLife_span, maxLife_span, image, userId, temperament} = req.body;
    try{
        if (name && minHeight && maxHeight && minWeight && maxWeight && minLife_span && maxLife_span && userId && temperament ){
            const allApiDogs = await callAllApiDogs()
            const apiDog = allApiDogs.find(dog => dog.name === name)
            if (!apiDog){
                let dogName = name[0].toUpperCase() + name.substring(1).toLowerCase()
                const dbDog = await findDbDog(dogName)
                if (!dbDog){
                    const newDog = await Dog.create({
                        name: dogName,
                        id: idValue++,
                        height: `${minHeight} - ${maxHeight}`,
                        weight: `${minWeight} - ${maxWeight}`,
                        life_span: `${minLife_span} - ${maxLife_span}`,
                        image,
                        userId
                    })
                    await newDog.setTemperaments(temperament)
                    return res.json({message: `${dogName} was saccesfuly created` })
                } else {
                    return res.status(404).json({message: `${dogName} already exist`})
                }
            } else {
                return res.status(404).json({message: `${dogName} already exist`})
            }
        } else {
            res.status(404).json({message: 'Complete all information'})
        }
    } catch (err){
        console.log(err.reason)
    }
})

module.exports = router;