const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.post('/', graphController.save);
router.get('/:id', graphController.getByUserId);

module.exports = router;