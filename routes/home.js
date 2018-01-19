let app = new (require('express').Router)();
const models = require('../models');

// get
app.get('/', (req, res, next) => {
    models.Artists.find({})
    	.exec()
    	.then( (artists) => {
	        res.render('index', {
	            user: req.user,
	            artists
	        });
    }).catch(next);
});

module.exports = app;