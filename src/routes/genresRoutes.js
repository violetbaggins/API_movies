const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/genresController');

/* Index de Generos. */
router.get('/', controller.index);

module.exports = router;
