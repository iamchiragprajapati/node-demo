const empModel = require('../models/employee.model');
const empValidator = require('../validators/employee.validator');

async function getEmployees(req, res) {
    try {
        const users = await empModel.find();
        res.status(200).send({ data: users, message: 'Data getting successfully' })
    } catch (err) {
        res.status(400).send({ error: err, message: 'Bad request' });
    }
}

async function createEmployee(req, res) {
    try {
        const { error, value } = await empValidator.validateUser(req.body);
        if (error) {
            res.status(400).send({ error: error.details, message: error.details.map((x) => x.message).join(", ") });

        } else {
            const empData = new empModel({
                name: value.name,
                designation: value.designation,
            });
            const dataToSave = await empData.save();
            res.status(200).json({ data: dataToSave, message: 'User added successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: error.details, message: 'Bad request' });
        throw error;
    }
}

async function getEmployee(req, res) {
    try {
        const data = await empModel.findOne({ _id: req.params.id });
        if (!data) {
            res.status(400).json({ data, message: 'user not found' });
        }
        res.status(200).json({ data, message: 'User getting successfully' });

    } catch (error) {
        console.log('error======>', error);
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

async function updateEmployee(req, res) {
    try {
        const { error, value } = await empValidator.validateUser(req.body);
        if (error) {
            res.status(400).send({ error: error.details, message: error.details.map((x) => x.message).join(", ") });
        } else {
            const updatedUser = await empModel.findOneAndUpdate(
                { _id: req.params.id },
                { ...value },
                { new: true }
            );
            if (updatedUser) {
                res.status(200).send({ data: updatedUser, message: 'User updated successfully' });
            } else {
                res.status(400).send({ data: [], message: 'User not found' });
            }
        }
    } catch (error) {
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

async function deleteEmployee(req, res) {
    try {
        const emp = await empModel.findOne({ _id: req.params.id });
        console.log('emp========>', emp);
        if (!emp) {
            return res.status(400).json({ message: 'User not found' });
        }
        const result = await empModel.deleteOne({ _id: req.params.id });
        res.status(200).send({ data: result, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };