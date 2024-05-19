const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()


const BloodCenterRoute = require('./routes/BloodCenterRoutes')
const DonorAuthRoute = require('./routes/DonorRoutes')



mongoose.connect(process.env.MONGODB_URL_DEV)
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
} )


db.on('open', () => {
    console.log("Database connection Established!")
})


const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));

  app.options('*', cors());

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Welcome to Tanzania Blood Donors app API!!');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


app.use('/api/centers', BloodCenterRoute)
app.use('/api/donors', DonorAuthRoute)
