const express = require('express')
const router = express.Router();

const advisoryControllers = require('../controllers/advisory');

router.post('/createNew', advisoryControllers.createNewAdvisory);
router.get('/getAdvisories', advisoryControllers.getAdvisories);
router.get('/getUserAdvisories', advisoryControllers.getUserAdvisories);
router.delete('/deleteAdvisory', advisoryControllers.deleteAdvisory);
router.put('/updateAdvisory',advisoryControllers.updateAdvisory);

module.exports = router;