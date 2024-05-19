<<<<<<< HEAD
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
=======
// const express = require('express')
// const mongoose = require('mongoose')
// const morgan = require('morgan')
// const bodyParser = require('body-parser')
>>>>>>> 81ef2e5d1a19d3eb4a10184c351551fedae422f6

// const dotenv = require('dotenv')
// dotenv.config()


// const BloodCenterRoute = require('./routes/BloodCenterRoutes')
// const DonorAuthRoute = require('./routes/DonorRoutes')



<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URL_DEV)
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
} )
=======
// mongoose.connect('mongodb://127.0.0.1:27017/tanzania-blood-donors-db')
// const db = mongoose.connection
// db.on('error', (err) => {
//     console.log(err)
// } )
>>>>>>> 81ef2e5d1a19d3eb4a10184c351551fedae422f6


// db.on('open', () => {
//     console.log("Database connection Established!")
// })


<<<<<<< HEAD
const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));

  app.options('*', cors());

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
=======



// const app = express()

// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended: true}))
>>>>>>> 81ef2e5d1a19d3eb4a10184c351551fedae422f6

// const PORT = process.env.PORT || 3001

<<<<<<< HEAD
app.get('/', (req, res) => {
    res.send('Welcome to Tanzania Blood Donors app API!!');
  });
=======
// app.use((req, res, next) => {
//     res.status(404).send('404: Not Found');
//   });
// app.get('/', (req, res) => {
//     res.send('Welcome to Tanzania Blood Donors app!' + ' ' + 
//               'Use /api/donors to fetch all donors and /api/centers to fetch all blood centers');
//   });
>>>>>>> 81ef2e5d1a19d3eb4a10184c351551fedae422f6

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })


// app.use('/api/centers', BloodCenterRoute)
// app.use('/api/donors', DonorAuthRoute)

// export default app;

