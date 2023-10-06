const express = require('express');
const router = express.Router();
const employeeRoute = require('./employee.routes');
const authRoute = require('./auth.routes');

const empController = require('../controllers/employee.controller');

router.use('/employee', employeeRoute);
router.use('/auth', authRoute);
router.get('/abc', empController.getProfile);
module.exports = router;