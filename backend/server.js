const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(bodyParse.json());
const PORT = process.env.PORT;

const loginRouter = require('./routers/loginRouter.js');
const travelLogsRouter = require('./routers/travelLogsRouter.js');
const journeyPlansRouter = require('./routers/journeyPlansRouter.js');
const usersRouter = require('./routers/usersRouter.js');

server.use(loginRouter);
server.use(travelLogsRouter);
server.use(journeyPlansRouter);
server.use(usersRouter);

server.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT);
});