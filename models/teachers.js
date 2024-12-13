const connection = require('./connection');
const mongoose = require('mongoose');

const teacherSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Teacher = connection.model('Teacher', teacherSchema);

module.exports = Teacher;