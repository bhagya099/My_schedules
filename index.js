require('dotenv').config();
const express = require('express');

const app = express();

// routers
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/homepage');
// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// VIEW ENGINE
app.set('view engine', 'ejs');

//Set our static folder(CSS)
app.use(express.static('public'));

//Middleware
app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/homepage', homeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is lisning in : http://localhost:${PORT}`);
});