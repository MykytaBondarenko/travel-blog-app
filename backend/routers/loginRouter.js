const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const loginController = require("../controllers/loginController.js");

server.get('/login/passwordhash', loginController.getUserPasswordHash);
server.post('/login', loginController.createUserData);

module.exports = server;