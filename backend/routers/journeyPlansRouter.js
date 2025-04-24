const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const journeyPlansController = require("../controllers/journeyPlansController.js");

server.get('/journeyPlans', journeyPlansController.getJourneyPlansData);
server.get('/journeyPlans/getLocations', journeyPlansController.getJourneyPlansLocations);
server.get('/journeyPlans/getActivities', journeyPlansController.getJourneyPlansActivities);
server.get('/journeyPlans/getUser', journeyPlansController.getJourneyPlanUser);

module.exports = server;