const express = require('express');
const router = express.Router();
const validations = require('../middewares/validations');

const users = require('../controlers/users');

router.post('/register', validations.signupValidation, users.register);
router.post('/login', users.login);

module.exports = router;
