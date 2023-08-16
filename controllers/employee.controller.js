
const empModel = require('../models/employee.model');
const userValidator = require('../validators/employee.validator');

async function getEmployees(req, res) {
    try {
        const users = await empModel.find();
        res.send({ data: users, status: 200, message: 'Data getting successfully' })
    } catch (err) {
        res.send({ error: err, status: 400, message: 'Something went wrong' });
    }
}

async function createEmployee(req, res) {
    try {
        const { error, value } = await userValidator.validateUser(req.body);
        if (error) {
            res.send({ error: error.details, status: 400, message: error.details.map((x) => x.message).join(", ") });
        } else {
            const empData = new empModel({
                name: value.name,
                designation: value.designation,
            });
            const dataToSave = await empData.save();
            res.send({ data: dataToSave, status: 200, message: 'User added successfully' });
        }
    } catch (error) {
        res.send({ error: error.details, status: 400, message: 'Something went wrong' });
    }
}

async function getEmployee(req, res) {
    try {
        const data = await empModel.findOne({ _id: req.params.id });
        if (!data) {
            res.send({ data, status: 404, message: 'user not found' });
        }
        return res.send({ data, status: 200, message: 'User getting successfully' });

    } catch (error) {
        res.send({ error: err, status: 400, message: 'Something went wrong' });
    }
}

async function updateEmployee(req, res) {
    try {
        const updatedUser = await empModel.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true }
        );
        if (updatedUser) {
            res.send({ data: updatedUser, status: 200, message: 'User updated successfully' });
        } else {
            res.send({ data: [], status: 400, message: 'User not found' });
        }
    } catch (error) {
        res.send({ error: error, status: 400, message: 'Something went wrong' });
    }
}

async function deleteEmployee(req, res) {
    try {
        const data = await empModel.findByIdAndDelete(req.params.id);
        if (data) {
            res.send({ data: data, status: 200, message: 'User deleted successfully' });
        } else {
            res.send({ data: [], status: 400, message: 'User not found' });
        }

    } catch (error) {
        res.send({ error: error, status: 400, message: 'Something went wrong' });
    }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };