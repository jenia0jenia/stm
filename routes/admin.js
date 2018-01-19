let app = new (require('express').Router)();

const Humans = require("../models").Humans;

app.get('/admin', (req, res, next) => {

});

app.get('/config.json', (req, res, next) => {
    // let humans;
    console.log(res);      
});

app.post('/humans', (req, res, next) => {
    // if(!req.user) return res.redirect('/login');
    if (!req.body.id) {
        let date = Date.now();
        req.body.id = date;
    }
    let human = new Humans(req.body);
    human.save()
        .then(() => {
            res.redirect('/humans/' + human.slug);
        }).catch(next);
});

module.exports = app;