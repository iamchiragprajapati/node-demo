const express = require('express');
const router = express.Router();
const empController = require('../controllers/employee.controller');
const jwt = require('../middlewares/jwtvalidation');
const fileUpload = require('../helpers/file_upload');

// router.get('/', jwt.verifyToken, empController.getEmployees);
router.post('/', jwt.verifyToken, empController.createEmployee);
router.get('/:id', jwt.verifyToken, empController.getEmployee);
router.put('/:id', jwt.verifyToken, empController.updateEmployee);
router.delete('/:id', jwt.verifyToken, empController.deleteEmployee);
router.post('/profile', fileUpload.upload, empController.uploadProfile);
// below is for get image with name
// router.get('/profile/:id', jwt.verifyToken, empController.getProfileImg);
router.get('/profile/:id', jwt.verifyToken, empController.getProfile);
router.get('/', jwt.verifyToken, empController.getPaginationData);

module.exports = router;