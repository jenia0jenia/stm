const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const model = require('./config').model;

let files = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, model.requiredText]
    },

    src: {
        type: String,
        required: [true, model.requiredText]
    },

    alt: {
        type: String
    },

    smallSize: {
        type: Array
    }


});

// Компилируем и Экспортируем модель
module.exports = mongoose.model('files', files);