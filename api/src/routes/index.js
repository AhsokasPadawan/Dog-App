const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsRoutes = require('./dogs');
const TemperRoutes = require('./temperament');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogsRoutes);
router.use('/temperament', TemperRoutes);



module.exports = router;
