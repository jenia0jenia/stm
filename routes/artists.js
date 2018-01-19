let app = new (require('express').Router)();
const models = require("../models");

app.get('/artists', function(req, res, next)
{
    // if(!req.user) return res.redirect('/login');
    res.render('addartist', {
        user:req.user
    });
});

app.post('/artists', function(req, res, next)
{
    // if(!req.user) return res.redirect('/login');
    let artist = new models.Artists(req.body);
    artist.save()
        .then(() => {
            res.redirect('/artists/' + artist.slug);
        }).catch(next);
});

app.get('/artists/:slug', (req, res, next) => {
    models.Artists.findOne({
        slug:req.params.slug
    }).exec().then((artist) => {
        if(!artist) res.redirect('/#notfound');
        res.render('artists', {
            user:req.user,
            artist
        });
    }).catch(next);
});

module.exports = app;