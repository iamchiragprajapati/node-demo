const express = require('express');
const router = express.Router();
const employeeRoute = require('./employee.routes')

router.use('/employee', employeeRoute);
module.exports = router;