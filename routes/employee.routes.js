const express = require('express');
const router = express.Router();
const empController = require('../controllers/employee.controller');
const jwt = require('../middlewares/jwtvalidation');

router.get('/', jwt.verifyToken, empController.getEmployees);
router.post('/', jwt.verifyToken, empController.createEmployee);
router.get('/:id', jwt.verifyToken, empController.getEmployee);
router.put('/:id', jwt.verifyToken, empController.updateEmployee);
router.delete('/:id', jwt.verifyToken, empController.deleteEmployee);


module.exports = router;