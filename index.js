require('dotenv').config();

const express = require('express');
const db = require('./database')
const loginRouter = require('./routes/login')
const app = express();

// BODY PARSER
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Middleware
app.use('/',loginRouter)

// VIEW ENGINE
app.set('view engine', 'ejs')

//Set our static folder(CSS)
 app.use(express.static('public'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is lisning in : http://localhost:${PORT}`);
});