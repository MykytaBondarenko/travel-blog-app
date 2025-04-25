const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const usersController = require("../controllers/usersController.js");

server.get('/user', usersController.getUserData);
server.get('/user/getLogs', usersController.getUserLogs);
server.get('/user/getPlans', usersController.getUserPlans);
server.put('/user/updateEmail', usersController.updateUserEmail);
server.put('/user/updateAddress', usersController.updateUserAddress);
server.post('/user/createLog', usersController.createUserLog);
server.post('/user/createPlan', usersController.createUserPlan);
server.put('/user/updateLog', usersController.updateUserLog);
server.put('/user/updatePlan', usersController.updateUserPlan);
server.delete('/user/deleteLog', usersController.deleteUserLog);
server.delete('/user/deletePlan', usersController.deleteUserPlan);

module.exports = server;