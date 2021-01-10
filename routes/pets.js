const express = require('express');
const router = express.Router();
const petController = require('../controllers/petsController');

// Ruta de prueba
router.get('/pets', petController.getPets);
router.post('/pets', petController.save);
router.put('/pets/:id', petController.petUpdate);
router.get('/pets/:id', petController.getPet);
router.get('/pets/:id/daralta', petController.release);


module.exports = router;