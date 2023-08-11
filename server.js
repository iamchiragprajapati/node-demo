const express = require("express");
const app = express();
const port = 4100;
const mongoose = require('mongoose');
const empModel = require('./models/employee.model');
const userValidator = require('./validators/user_validator');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/e-commerce', {
    useNewUrlParser: true,
})

app.get('/', (req, res) => {
    // for send html file as response
    res.render('pages/index');
})


app.get('/about', (req, res) => {
    const user = {
        name: 'jack',
        email: 'jack@mail.com',
        technologies: ['Angular', 'React', 'Node', 'Laravel']
    }
    res.render('pages/about', { user });
})

app.get('/employee', async (req, res) => {
    try {
        const users = await empModel.find();
        res.send({ data: users, status: 200, message: 'Data getting successfully' })
    } catch (err) {
        res.send({ error: err, status: 400, message: 'Something went wrong' });
    }
})

app.get('/employee/:id', async (req, res) => {
    try {
        const data = await empModel.findOne({ _id: req.params.id });
        if (!data) {
            res.send({ data, status: 404, message: 'user not found' });
        }
        return res.send({ data, status: 200, message: 'User getting successfully' });

    } catch (error) {
        res.send({ error: err, status: 400, message: 'Something went wrong' });
    }
})

app.post('/employee', async (req, res) => {
    try {
        const { error, value } = await userValidator.validateUser(req.body);
        if (error) {
            res.send({ error: error.details, status: 400, message: error.details.map((x) => x.message).join(", ") });
        } else {
            const empData = new empModel({
                name: req.body.name,
                designation: req.body.designation,
            });
            const dataToSave = await empData.save();
            res.send({ data: dataToSave, status: 200, message: 'User added successfully' });
        }
    } catch (error) {
        console.log(error, 'errror');
        res.send({ error: error.details, status: 400, message: 'Something went wrong' });
    }
})

app.put('/employee/:id', async (req, res) => {
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
})

app.delete('/employee/:id', async (req, res) => {
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
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})