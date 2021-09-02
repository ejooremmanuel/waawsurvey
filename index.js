//Require dependencies
const express = require('express');
const ejs = require('ejs');
const { randomBytes } = require('crypto');
const mongoose = require('mongoose');
const User = require('./models/user');
const Survey = require('./models/survey');
const app = express();
const port = process.env.PORT || 4000;


//set up express
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

//Generate a random userId
const userid = randomBytes(10).toString('hex');

//connect to mongodb with mongoose
mongoose.connect('mongodb://localhost/surveyapp')
    .then(() => { console.log('Database connected successfully!') })
    .catch((err) => { console.log('Error connecting to database!', err) });


//Endpoints

app.route('/register')
    .get((req, res) => {

        res.render('register');

    }).post(async(req, res) => {
        const { lastname, firstname, email, phone } = req.body;
        let user = await new User({
            lastname: lastname,
            firstname: firstname,
            email: email,
            phone: phone,
            userid: userid
        });

        user.save()
            .then(() => { console.log() })
            .catch((err) => { console.log(err) });

        res.render('success', { userid: userid, lastname: lastname, firstname: firstname });


    });


app.route('/survey')
    .get((req, res) => {

        res.render('survey');

    }).post(async(req, res) => {

        const { title, description, place, start, end, user } = req.body;

        let survey = await new Survey({
            title: title,
            description: description,
            place: place,
            start: start,
            end: end,
            user: user
        });

        survey.save()
            .then(() => { console.log() }).catch((error) => { console.log(error) });
        res.redirect('/survey');
    });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});