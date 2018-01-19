let app = new (require('express').Router)();
const models = require("../models");

app.get('/articles', function(req, res, next)
{
    // if(!req.user) return res.redirect('/login');
    res.render('addarticle', {
        user:req.user
    });
});

app.post('/articles', function(req, res, next)
{
    // if(!req.user) return res.redirect('/login');
    let article = new models.Articles(req.body);
    article.save()
        .then(() => {
            res.redirect('/articles/' + article.slug);
        }).catch(next);
});

app.get('/articles/:slug', (req, res, next) => {
    models.Articles.findOne({
        slug:req.params.slug
    }).exec().then((article) => {
        if(!article) res.redirect('/#notfound');
        res.render('article', {
            user:req.user,
            article
        });
    }).catch(next);
});

module.exports = app;