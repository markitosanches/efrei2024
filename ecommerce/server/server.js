const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOption = {
    origin: 'http://localhost:8081'
}


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

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
