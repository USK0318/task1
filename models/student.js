const connection = require('./connection');
const mongoose = require('mongoose');

const studentSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    classs: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Student = connection.model('Student', studentSchema);

module.exports = Student;