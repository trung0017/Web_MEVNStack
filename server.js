const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const path = require('path')
const app = express()
const PORT = 5000

const accountRoute = require('./routes/api/Account')
const productRoute = require('./routes/api/Product.js')
const postRoute = require('./routes/api/Post')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json()) 

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.use('/api/account', accountRoute)
app.use('/api/product', productRoute)
app.use('/api/post', postRoute)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))