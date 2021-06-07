const {Router} = require('express');
const {getTemperaments, getAllTemperaments} = require('../controllers/temperament');

const router = Router();

router.get('/', getTemperaments);
router.get('/all', getAllTemperaments);

module.exports = router;