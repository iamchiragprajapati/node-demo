const empModel = require('../models/employee.model');
const profileModel = require('../models/profile.model');
const empValidator = require('../validators/employee.validator');
const fs = require('fs');

async function getEmployees(req, res) {
    try {
        // const users = await empModel.find();

        // getting specific data with help of aggregation
        const users = await empModel.aggregate([
            {
                $project: {
                    name: 1,
                    designation: 1,
                    yearsOfExperience: 1
                }
            },
            {
                $sort: {
                    yearsOfExperience: -1
                }
            },
            // {
            //     $addFields: { totalNo: { $count: 'total_documents' } }
            // }
            {
                $group: {
                    _id: null,
                    users: { $push: "$$ROOT" },
                    totalNo: { $sum: 1 }
                }
            },
            {
                $unwind: "$users"
            },
            {
                $replaceRoot: { newRoot: "$users" }
            }
            // Here is a example of addfields aggregration to add new fields
            // { $addFields: { foundation_year: 1218 } }
        ])

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
            const existUser = await empModel.findOne({ name: req.body.name.trim() });
            if (existUser) {
                res.status(400).send({ message: 'Employee already exists' });
            } else {
                const empData = new empModel({
                    name: value.name.trim(),
                    designation: value.designation.trim(),
                    yearsOfExperience: value.yearsOfExperience
                });
                const dataToSave = await empData.save();
                res.status(200).json({ data: dataToSave, message: 'Employee added successfully' });
            }
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
            res.status(400).json({ data, message: 'Employee not found' });
        }
        res.status(200).json({ data, message: 'Employee details getting successfully' });

    } catch (error) {
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
                res.status(200).send({ data: updatedUser, message: 'Employee updated successfully' });
            } else {
                res.status(400).send({ data: [], message: 'Employee not found' });
            }
        }
    } catch (error) {
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

async function deleteEmployee(req, res) {
    try {
        const emp = await empModel.findOne({ _id: req.params.id });
        if (!emp) {
            return res.status(400).json({ message: 'Employee not found' });
        }
        const result = await empModel.deleteOne({ _id: req.params.id });
        res.status(200).send({ data: result, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

async function uploadProfile(req, res) {
    try {
        // const imgPath = 'uploads/' + req.file.filename;
        // const imageBuffer = fs.readFileSync('./uploads/' + req.file.filename);
        console.log(req);
        const profileData = new profileModel({
            email: req.body.email.trim(),
            name: req.body.name.trim(),
            profilePic: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        const savedProfileData = await profileData.save();
        res.status(200).json({ data: savedProfileData, message: 'Profile saved successfully' });
    } catch (error) {
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}

async function getProfile(req, res) {
    console.log('body=>', req.body);
    try {
        const profileData = await profileModel.findOne({ email: 'mail1@mail.com' });
        res.contentType('image/jpeg'); // Set the appropriate content type
        console.log(profileData);
        // const fs = require('fs');
        // const imageStream = fs.createReadStream(image.profilePic);
        // imageStream.pipe(res);
        res.send(profileData.profilePic);
        fs.writeFileSync('./uploads/abc1.jpeg', profileData.profilePic);
        // res.status(200).json({ data: [], message: 'Employee details getting successfully' });

    } catch (error) {
        console.log('imgerror=>', error);
        res.status(400).send({ error: error, message: 'Bad request' });
    }
}
module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, uploadProfile, getProfile };