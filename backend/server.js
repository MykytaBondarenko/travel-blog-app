const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(bodyParse.json());
const PORT = process.env.PORT;

const loginRouter = require('./routers/loginRouter.js');

server.use(loginRouter);

server.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT);
});