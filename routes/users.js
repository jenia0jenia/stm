let app = new (require('express').Router)();
const models = require("../models");

app.get('/users', function(req,res,next)
{
    if(!req.user) return res.redirect('/login');
    res.render('adduser',{
        user:req.user
    });
});

app.post('/users', function(req, res, next)
{
    if(!req.user) return res.redirect('/login');
    let user = new models.Users(req.body);
    user.save()
        .then(() => {
            res.redirect('/users/' + user.slug);
        }).catch(next);
});

app.get('/users/:slug', (req, res, next) => {
    models.Users.findOne({
        slug:req.params.slug
    }).exec().then((user) => {
        if(!user) res.redirect('/#notfound');
        res.render('users', {
            user: req.user,
            user
        });
    }).catch(next);
});

module.exports = app;