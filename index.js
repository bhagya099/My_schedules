require('dotenv').config();

const express = require('express');
const morgan = require('morgan')
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3000

// routers
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/homepage');
const logoutRouter = require('./routes/logout');
const schedulesRouter = require('./routes/schedules');

const userRouter = require('./routes/user');

//  middleware
const { redirectToHome } = require('./middleware');
const { redirectToLogin } = require('./middleware');
// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// VIEW ENGINE
app.set('view engine', 'ejs');

//Set our static folder(CSS)
app.use(express.static('public'));
// Session config
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    name: 'mrcoffee_sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
  })
);

//displaying pages using router
app.use('/', loginRouter);
app.use('/signup', redirectToHome, signupRouter);
app.use('/homepage', redirectToLogin, homeRouter);
app.use('/logout', redirectToLogin, logoutRouter);
app.use('/schedules', schedulesRouter);
app.use('/user', userRouter);



app.listen(PORT, () => {
    console.log(`server is lisning in : http://localhost:${PORT}`);
});