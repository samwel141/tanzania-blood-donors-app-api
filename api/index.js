// const express = require("express");
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(6000, () => console.log("Server ready on port 3000."));

// module.exports = app;



const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()


const BloodCenterRoute = require('../routes/BloodCenterRoutes')
const DonorAuthRoute = require('../routes/DonorRoutes')



mongoose.connect('mongodb://127.0.0.1:27017/tanzania-blood-donors-db')
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
} )


db.on('open', () => {
    console.log("Database connection Established!")
})





const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3001


app.get('/', (req, res) => {
    res.send('Welcome to Tanzania Blood Donors app!' + ' ' + 
              'Use /api/donors to fetch all donors and /api/centers to fetch all blood centers');
  });
  app.use((req, res, next) => {
    res.status(404).send('404: Not Found');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


app.use('/api/centers', BloodCenterRoute)
app.use('/api/donors', DonorAuthRoute)

export default app;

