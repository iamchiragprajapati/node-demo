const express = require("express");
const app = express();
const port = 4100;

app.use(express.json());


app.set('view engine', 'ejs');

const employeeData = [
    {
        name: 'user1',
        designation: 'Software engineer',
        id: 1
    },
    {
        name: 'user2',
        designation: 'Senior software engineer',
        id: 2
    }, {
        name: 'user3',
        designation: 'Tech Lead',
        id: 3
    }, {
        name: 'user4',
        designation: 'Team Lead',
        id: 4
    }
]

app.get('/', (req, res) => {
    // Used for send normal text as response
    // res.send('Hello world from get....');

    // Used for send html file as response
    res.render('pages/index');
})


app.get('/about', (req, res) => {
    const user = {
        name: 'jack',
        email: 'jack@mail.com',
        technologies: ['Angular', 'React', 'Node', 'Laravel']
    }
    // res.send('Hello world from get....');
    res.render('pages/about', { user });
})

app.get('/employee', async (req, res) => {
    res.json(employeeData);
})

app.get('/employee/:id', (req, res) => {
    const employee = employeeData.find((emp) => emp.id == req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.send('User not found');
    }
})

app.post('/employee', async (req, res) => {
    if (req.body.id) {
        employeeData.push(req.body);
        res.json(employeeData);
    } else {
        res.send('Please enter id');
    }
})

app.put('/employee', (req, res) => {
    if (req.body.id) {
        const updatedEmp = employeeData.findIndex((emp) => emp.id == req.body.id);
        if (updatedEmp == -1) {
            res.send('User not found');
        } else {
            employeeData[updatedEmp] = req.body;
            res.json(employeeData[updatedEmp]);
        }
    } else {
        res.send('Please enter id');
    }
})

app.delete('/employee/:id', (req, res) => {
    if (req.params.id) {
        const empId = employeeData.findIndex((emp) => emp.id == req.params.id);
        if (empId == -1) {
            res.send('User not found');
        } else {
            employeeData.splice(empId, 1);
            res.json(employeeData);
        }
    } else {
        res.send('Please enter id');
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})