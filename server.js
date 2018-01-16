// Setrup environment variable
require('dotenv').config();


// grab our dependencies
const express  = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session);


// Configur application
// set static directory
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set view
app.set('view engine', 'ejs');


//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));


// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});



// connect mongoose database
mongoose.connect(process.env.DB_URI, { useMongoClient: true });

// route setup
app.use(require('./app/routes'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});  



// start server
app.listen(port, ()=>{
    console.log(`server is running on ${port} port`)
})
