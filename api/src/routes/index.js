const { Router } = require('express');
// Importar todos los routers;
const dogs = require('./dogs');
const temperaments = require('./temperaments')
const athentication = require('./athentication')
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogs)
router.use('/temperaments', temperaments)
router.use('/athentication', athentication)


module.exports = router;
