import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const CategoryRoute = require('./routes/category')
const app = express();
const port = process.env.PORT || 3000;

dotenv.config()
// Current IP Address (102.89.47.65/32) added!
// https://tailwindflex.com/tag/pricing
// https://play.tailwindcss.com/FGMEFZKqXw

mongoose.connect(String(process.env.MONGODB_URI))
.then(() => {console.log('Foodly Database is Connected')})
.catch((error) => console.log(error))
.finally(() => {console.log()})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('categories', CategoryRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(process.env.PORT || 6013, () => console.log(`Backend Foodie Server App running on port: ${process.env.PORT || 6013}!` ));
