const router = require('express').Router();

// import all the API routes
const apiRoutes = require('./api');

//add prfix for '/api' to all of the api routes import from the api folder

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;
