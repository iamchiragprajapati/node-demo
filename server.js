const express = require("express");
const app = express();
const port = 4100;
const mongoose = require('mongoose');
const route = require('./routes/route');

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

app.use('/employee', route);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})