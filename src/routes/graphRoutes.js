const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');
// const authenticate = require('../middlewares/authenticate')

router.post('/', graphController.save);
router.get('/:userId', graphController.getByUserId); // TODO: figure out authentication issue

module.exports = router;