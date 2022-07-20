const { Router } = require('express');
const router = Router();
const { Temperament } = require('../../src/db.js');

router.get('/', (req,res)=>{
    Temperament.findAll({
        attributes:['id', 'name']
    }).then(temperaments=>{
        res.json(temperaments)
    })
})

module.exports = router;