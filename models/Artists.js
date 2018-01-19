const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const model = require('./config').model;

let artists = new mongoose.Schema({
    name: {
        type: String,
        required: [true, model.requiredText],
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
artists.plugin(URLSlugs('name'));

// Компилируем и Экспортируем модель
module.exports = mongoose.model('artists', artists);