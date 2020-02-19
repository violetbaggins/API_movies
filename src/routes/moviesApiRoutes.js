const express = require('express');
const router = express.Router();

//Controller

const controller = require ('../controllers/api/moviesController');

// Routes
router.get("/", controller.index);
router.post("/", controller.store);
router.get("/:id", controller.show);

module.exports = router;