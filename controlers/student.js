const student = require('../models/student');
const uplode = require('../middewares/fileuplode');
const { validationResult } = require('express-validator');

const getStudents = async (req, res) => {
    try {
        const students = await student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const studen = await student.findById(id);
        res.status(200).json(studen);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    if (req.files) {
        const photo = req.files.photo
        if (photo.mimetype !== 'image/jpg' && photo.mimetype !== 'image/png') {
            return res.status(400).json({ message: 'Only jpg and png images are allowed' })
        }
    }
    const { name, age, classs, section, rollNumber } = req.body;
    const studentexist = await student.findOne({ rollNumber });
    if (studentexist) return res.status(400).json({ message: 'Student already exist with this roll number' });
    const path = await uplode.handleFileUpload(req.files.photo, 'students');
    const newStudent = new student(
        {
            name,
            age,
            classs,
            section,
            rollNumber,
            photo: path,
        }
    );
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    if (req.files) {
        const photo = req.files.photo
        if (photo.mimetype !== 'image/jpg' && photo.mimetype !== 'image/png') {
            return res.status(400).json({ message: 'Only jpg and png images are allowed' })
        }
    }
    const { id } = req.params;
    const { name, age, classs, section, rollNumber } = req.body;
    const studentexist = await student.findById(id);
    if (!studentexist) return res.status(404).json({ message: 'Student not found' });
    if (studentexist.rollNumber != rollNumber) {
        const studentexist = await student.findOne({ rollNumber });
        if (studentexist) return res.status(400).json({ message: 'Student already exist with this roll number' });
    }
    let path = studentexist.photo;
    if (req.files) {
        const path = await uplode.handleFileUpload(req.files.photo, 'students');
        await uplode.deleteFile(studentexist.photo);
    }
    try {
        const updatedStudent = await student.findByIdAndUpdate
            (id, { name, age, classs, section, rollNumber, photo: path }, { new: true });
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const studentexist = await student.findById(id);
        if (!studentexist) return res.status(404).json({ message: 'Student not found' });
        await uplode.deleteFile(studentexist.photo);
        await student.findByIdAndDelete(id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { getStudents, getStudent, addStudent, updateStudent, deleteStudent };