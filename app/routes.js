const express  = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventController = require('./controllers/event.controller')
    userController = require('./controllers/user.controller');

// export router
module.exports = router;

// define route
router.get('/', mainController.showHome);


// register from route
router.get('/register', userController.registerForm);

// Registration process
router.post('/register', userController.register);


// login from route
router.get('/login', userController.loginForm);

// logout session
router.get('/logout', userController.logout);

// login process
router.post('/login', userController.login);

// Simple profile route
// router.get('/profile', userController.profile);


router.get('/events', eventController.showEvents);

// create event
router.get('/events/create',userController.requiredAuthentication ,eventController.createEvent);

// edit eventz
router.get('/events/:id/edit',userController.requiredAuthentication , eventController.editEvent);

// update event
router.post('/events/:id/update',userController.requiredAuthentication , eventController.updateEvent);

// save eevent
router.post('/events',userController.requiredAuthentication , eventController.saveEvent);

// delete event
router.post('/events/:id/delete',userController.requiredAuthentication , eventController.deleteEvent);


// seed database
router.get('/events/seed', eventController.seedEvent);


// show single event
router.get('/events/:id', eventController.singleEvent);