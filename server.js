const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(fileUpload({
  limits: { fileSize: 8 * 1024 * 1024 },
}));

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const routes = require('./routes/student');
const users = require('./routes/users');

app.use('/student', routes);
app.use('/teacher', users);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});