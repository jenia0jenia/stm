const mongoose = require('mongoose');

const model = require('./config').model;

let users = new mongoose.Schema({
    username: {
        type: String,
        required: [true, model.requiredText],
        maxlength: [model.maxLen, model.maxLenText],
        minlength: [model.minLen, model.minLenText],
        match: [/^[a-z0-9]+$/, model.incorrectText],
        unique: false
    },
    
    password: {
        type: String, // тип String
        // В дальнейшем мы добавим сюда хеширование
        maxlength: [model.maxLen, model.maxLenText],
        minlength: [model.minPassLen, model.minLenText],
        match: [/^[A-Za-z0-9]+$/, model.incorrectText],
        required: [true, model.requiredText]
        // Думаю здесь все уже очевидно
    },
    // Здесь будут и другие поля, но сейчас еще рано их сюда ставить!
});

// Теперь подключим плагины (внешние модули)

module.exports = mongoose.model('users', users);