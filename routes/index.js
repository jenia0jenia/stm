let app = new (require('express').Router)();

// app.use(require('./auth'));
app.use(require('./home'));
app.use(require('./articles'));
app.use(require('./artists'));
app.use(require('./users'));
app.use(require('./humans'));

module.exports = app;
