const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome to our express app')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})