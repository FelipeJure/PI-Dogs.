const { Dog, Temperament } = require('../../src/db.js');
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const { text } = require('body-parser');
const { Op } = require('sequelize')

const callApiDogs = async () => {
    try{
        let dogs = await fetch('https://api.thedogapi.com/v1/breeds')
        dogs = await dogs.json()
        dogs = dogs.map(dog => {
            return dog = {
                image: dog.image.url,
                name: dog.name,
                temperament:dog.temperament,
                weight:dog.weight.metric,
                id: dog.id,
                height: dog.height.metric,
                life_span: dog.life_span,
                temperament: dog.temperament?.split(", ")
            }
        })
        return dogs
    }
    catch (error){
        console.log(error)
        return []
    }
}
const findDbDogs = async () => {
    try{
    let dbDog = await Dog.findAll(
        {
            include:{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        }
    )
    if(dbDog) {
        dbDog = dbDog.map(dog => {
            dog = dog.toJSON()
            dog.name = dog.name.split(' ')
            dog.name = dog.name.map(name => {
                return name = name[0].toUpperCase() + name.substring(1).toLowerCase()
            })
            dog.name = dog.name.join(' ')
            return dog
        })
    }
    return dbDog
    }
    catch (error){
        console.log(error)
        return []
    }
}
const findAllDogs = async () => {
    try{
        const apiDogs = await callApiDogs()
        const dbDogs = await findDbDogs()
        const allDogs = [...apiDogs,...dbDogs]
        allDogs.sort((a,b) => {
            if(a.name>b.name) return 1
            if(a.name<b.name)return -1
            else return 0
        })
        return allDogs
    }
    catch (error){
        console.log(error)
    }
}
let idValue = 1000

router.get('/', async (req, res) =>{
    const { name } = req.query;
    try{
        let dogs = await findAllDogs()
        if (name){
            dogs = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            if(dogs.length) return res.json(dogs)
            res.status(404).json({message: 'Dog not found'})
        }
        return res.json(dogs)
    } catch(error){
        console.log(error)
    }
})

router.get('/:idRaza',async (req,res) => {
    const { idRaza } = req.params;
    let dogs = await findAllDogs()
    const dog = dogs.find(dog => dog.id === Number(idRaza))
    if (dog) return res.json(dog)
    return res.status(404).json({message: 'Dog not found'})
})

router.post('/', async (req,res) =>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, minLife_span, maxLife_span, image, /*userId, */temperament} = req.body;
    try{
        // console.log(req.body)
        if (name && minHeight && maxHeight && minWeight && maxWeight && minLife_span && maxLife_span /*&& userId*/ && temperament ){
            let dogs = await findAllDogs()
            let existName = dogs.find(dog => dog.name.toLowerCase() === name.toLowerCase())
            if (!existName){
                return Dog.create({
                    name: name.toLowerCase(),
                    id: idValue++,
                    height: `${minHeight} - ${maxHeight}`,
                    weight: `${minWeight} - ${maxWeight}`,
                    life_span: `${minLife_span} - ${maxLife_span} years`,
                    image: image? image: null,
                    // userId
                })
                .then(dog => {
                    return dog.setTemperaments(temperament)})
                .then(()=> res.json({message: 'Dog saccesfully created' }))
            } else {
                return res.status(404).json({message: 'This dog already exist'})
            } 
        } else {
            res.status(404).json({message: 'Complete all information'})
        }
    } catch (err){
        console.log(err.reason)
    }
})

module.exports = router;