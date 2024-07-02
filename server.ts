import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
const CategoryRoute = require('./routes/category')
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || 'mongodb+srv://fitzgeraldkachi:lOuYnPyGhkFcDBLL@foodie.axm7hl4.mongodb.net/';

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')


// middleware 
app.use((req, res, next) => {
  var now = new Date(); 
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '/n', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
    next();
  })}
);

// app.use((req, res, next) => {
//   res.render('maintiance.hbs')
// })
hbs.registerHelper('streamIt', (text: string) => {
  return text.toUpperCase() 
})
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear() 
})
app.set('view engine', 'hbs')

console.log("life",String(uri))

dotenv.config() 
// Current IP Address (102.89.47.65/32) added!
// https://tailwindflex.com/tag/pricing
// https://play.tailwindcss.com/FGMEFZKqXw

mongoose.connect(String(uri), 
// { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {console.log('Foodly Database is Connected')})
.catch((error) => console.log(error))
.finally(() => {console.log('MongoDB connection final:', String(uri))})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('categories', CategoryRoute)

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    // header: 'Header',
    welcomeMessage: 'Welcome to Home Page',
    currentYear: new Date().getFullYear(),
  });
});

8757E111
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});


app.get('/bad', (req, res) => {
  res.send({
    error: "unable to fulfill request"
  });
});
app.get('/about', (req, res) => {
  res.send({
    name: 'Foodly',
    version: '1.0.0',
    description: 'Foodly is an app that helps you find the best restaurants in your area.',
    author: 'Foodly Team',
    contact: 'https://github.com/Foodly-Team',
    license: 'MIT',
  });
});

app.use(express.static(__dirname + '/public'))
app.listen(process.env.PORT || 6013, () => console.log(`Backend Foodie Server App running on port: ${process.env.PORT || 6013}!` ));


// yarn --frozen-lockfile install