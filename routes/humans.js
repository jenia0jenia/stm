let app = new (require('express').Router)();
// const models = require("../models");
const Humans = require("../models").Humans;

app.get('/humans', (req, res, next) => {
    if (req.url == './config.json') {
    // искусственная задержка для наглядности
    setTimeout(function() {
        res.render('humans', {
            })
    }, 1000);
    } else {
    }
    // console.log(req.url);
    // let humans;
    Humans.find({})
        .exec()
        .then( (humans) => {
            res.render('addhuman', {
                user: req.user,
                humans
            });
    }).catch(next);

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

// app.get('/humans/:slug', (req, res, next) => {
//     Humans.findOne({
//         slug:req.params.slug
//     })
//         .exec()
//         .then((human) => {
//         if (!human) res.redirect('/#notfound');
//             res.render('res', {
//                 user:req.user,
//                 human
//             });
//     }).catch(next);
// });

module.exports = app;