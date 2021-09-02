const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    description: String,
    place: String,
    start: Date,
    end: Date,
    user: String
});

const Survey = mongoose.model('Survey', surveySchema);


module.exports = Survey;