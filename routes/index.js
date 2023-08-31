const express = require('express');
const router = express.Router();
const employeeRoute = require('./employee.routes');
const authRoute = require('./auth.routes');

router.use('/employee', employeeRoute);
router.use('/auth', authRoute);
module.exports = router;