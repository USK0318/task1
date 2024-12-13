const express = require('express');
const router = express.Router();
const auth = require('../middewares/token');
const validations = require('../middewares/validations');

const students = require('../controlers/student');

router.get('/', auth, students.getStudents);
router.get('/:id', auth, students.getStudent);
router.post('/', validations.studentValidation, auth, students.addStudent);
router.put('/:id', validations.studentValidation, auth, students.updateStudent);
router.delete('/:id', auth, students.deleteStudent);


module.exports = router;





