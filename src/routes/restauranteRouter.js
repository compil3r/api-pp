const {Router} = require('express');

const router = Router();

const {storeRestaurante, getRestaurantes} = require('../controller/restauranteController');

router.post('/store/restaurante', storeRestaurante);

router.get('/get/restaurantes', getRestaurantes);

module.exports = router;