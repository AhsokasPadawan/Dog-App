const {Router} = require('express');
const {getSomeDogs, getDogsBreed, getFullDogs,getDogsNames,postADog} = require('../controllers/dogs');

const router = Router();

// 'localhost: 3001/dogs/

router.get('/breed/:idBreed', getFullDogs);
router.get('/search',getDogsBreed);
router.get('/names',getDogsNames);
router.get('/', getSomeDogs);
router.post('/', postADog);

module.exports = router;

