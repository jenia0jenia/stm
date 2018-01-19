const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const model = require('./config').model;

let articles = new mongoose.Schema({
    title: {
        type: String,
        required: [true, model.requiredText], // Данное поле обязательно. Если его нет вывести ошибку с текстом titleRequired
        minlength: [model.minLen, model.minLenText],
        unique: false
    },

    id: {
        type: String,
        required: [true, model.requiredText]
    },

    slug: String
});

// Теперь подключим плагины (внешние модули)

// Подключим генератор на основе названия
articles.plugin(URLSlugs('title'));

// Компилируем и Экспортируем модель
module.exports = mongoose.model('articles', articles);