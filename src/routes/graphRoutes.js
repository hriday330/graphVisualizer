const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');
const authenticate = require('../middlewares/authenticate')

router.post('/', authenticate, graphController.save);
router.get('/:userId', authenticate, graphController.getByUserId);

module.exports = router;