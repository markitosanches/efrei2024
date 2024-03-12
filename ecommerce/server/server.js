const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const corsOption = {
    credentials: true,
    origin: 'http://localhost:8081'
}

app.use(cookieParser())

app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const db = require('./app/models')
db.connex.sync()

//test
app.get('/', (req, res) => {
    res.json({message: 'Welcome'})
})

require('./app/routes/product.route')(app)
require('./app/routes/user.route')(app)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
