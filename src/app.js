const morgan = require('morgan');
const express = require('express');

const taskApi = require('./api/task.api');
const userApi = require('./api/user.api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/task', taskApi);
app.use('/v1/user', userApi);

app.listen(3000, () => console.log('The server is up on PORT 3000'));
