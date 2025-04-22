const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const travelLogsController = require("../controllers/travelLogsController.js");

server.get('/travelLogs', travelLogsController.getTravelLogsData);
server.get('/travelLogs/getTags', travelLogsController.getTravelLogsTags);
server.get('/travelLogs/getUser', travelLogsController.getTravelLogUser);

module.exports = server;