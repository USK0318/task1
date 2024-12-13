const { body, validationResult } = require('express-validator');

const signupValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail()
        .isLength({ max: 50 })
        .withMessage('Email must be less than 50 characters'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/)
        .withMessage('Password must contain at least one special character (@$!%*?&#)')
        .isLength({ max: 20 })
        .withMessage('Password must be less than 20 characters'),

    body('name')
        .notEmpty()
        .withMessage('username is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('username can only contain letters')
        .isLength({ min: 2, max: 50 })
        .withMessage('username must be between 2 and 50 characters'),
];


const studentValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Name can only contain letters')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),

    body('age')
        .notEmpty()
        .withMessage('Age is required')
        .isInt({ min: 1, max: 100 })
        .withMessage('Age must be between 1 and 100'),

    body('classs')
        .notEmpty()
        .withMessage('Class is required')
        .isInt({ min: 1, max: 12 })
        .withMessage('Class must be between 1 and 12'),
    body('section')
        .notEmpty()
        .withMessage('Section is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Section can only contain letters')
        .isLength({ min: 1, max: 1 })
        .withMessage('Section must be 1 character long'),
    // body('rollNumber')
    //     .notEmpty()
    //     .withMessage('Roll Number is required')
    //     .isInt({ min: 1 })
    //     .withMessage('Roll Number must be greater than 0')
]


module.exports = {
    signupValidation,
    studentValidation,
};