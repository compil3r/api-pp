const express = require('express')
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const taskRouter = require('./routes/taskRouter');
const restauranteRouter = require('./routes/restauranteRouter');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, "uploads")))

app.use('/api', taskRouter);
app.use('/api', restauranteRouter);

module.exports = app;