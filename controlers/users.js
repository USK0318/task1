const Teacher = require('../models/teachers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const { name, email, password } = req.body;
        const userexist = await Teacher.findOne({ email });
        if (userexist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Teacher({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'There was a problem registering the user' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const SECRET_KEY = process.env.SECRET_KEY;
        const user = await Teacher.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '500h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
}