const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const model = require('./config').model;
const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let humans = new mongoose.Schema({
    name: {
        type: String,
        required: [true, model.requiredText],
        minlength: [model.minLen, model.minLenText],
        unique: false
    },

    familyName: {
        type: String
    },

    surname: {
        type: String
    },

    birthday: {
        type: Date
    },

    email: {
        type: String,
        match: [emailRe, model.incorrectText]
    },

    previewImage: {
        type: Number,
        default: 0
    },

    images: {
        type: Array,
        default: []
    },

    announcement: {
        type: String,
        maxlength: [model.maxLenAnons, model.maxLenText]
    },

    description: {
        type: String
    },

    active: {
        type: Boolean,
        default: true
    },

    autoIndex: process.env.mode == 'development',
    
    slug: String
});

// Теперь подключим плагины (внешние модули)
console.log();
// Подключим генератор на основе названия
humans.plugin(URLSlugs('name'));

// Компилируем и Экспортируем модель
module.exports = mongoose.model('humans', humans);