const db = require('../database.js');

exports.getUserData = (req, res) => {
    const data = req.query;
    const username = data.username;

    let queryContent = `SELECT * FROM User WHERE username = '${username}'`;
    //console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                //console.log(result);
                res.send(result);
            }
        }
    )
}

exports.getUserLogs = (req, res) => {
    const data = req.query;
    const username = data.username;

    let queryContent = `SELECT Travel_Log.* FROM Travel_Log, User_has_Log WHERE User_has_Log.logID = Travel_Log.logID AND User_has_Log.username = '${username}' ORDER BY start_date`;
    //console.log(queryContent);

    db.query(
        queryContent,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                //console.log(result);
                res.send(result);
            }
        }
    )
}

exports.getUserPlans = (req, res) => {
    const data = req.query;
    const username = data.username;

    let queryContent = `SELECT Journey_Plan.* FROM Journey_Plan, User_has_Plan WHERE User_has_Plan.planID = Journey_Plan.planID AND User_has_Plan.username = '${username}' ORDER BY start_date`;
    //console.log(queryContent);

    db.query(
        queryContent,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                //console.log(result);
                res.send(result);
            }
        }
    )
}

exports.updateUserEmail = (req, res) => {
    const data = req.body;
    const username = data.username;
    const email = data.email;

    let queryContent = `UPDATE User SET email = '${email}' WHERE username = '${username}'`;
    console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.updateUserAddress = (req, res) => {
    const data = req.body;
    const username = data.username;
    const address = data.address;

    let queryContent = `UPDATE User SET address = '${address}' WHERE username = '${username}'`;
    console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.createUserLog = (req, res) => {
    const data = req.body;
    const username = data.username;
    const title = data.title;
    const description = data.description;
    const start_date = data.start_date;
    const end_date = data.end_date;
    const tags = data.tags;

    let queryContent = `INSERT INTO Travel_Log (logID, title, description, start_date, end_date, post_date) VALUES (NULL, '${title}', '${description}', '${start_date}', '${end_date}', current_timestamp())`;
    //console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                //console.log(result);
                connectLogToUser(username, result.insertId);
                if (tags) createTags(tags, result.insertId);
                //connectTagsToLog(result.insertId, tags);
                res.send(result);
            }
        }
    )
}

function connectLogToUser(username, logID) {
    let queryContent = `INSERT INTO User_has_Log (username, logID) VALUES ('${username}', ${logID})`;
    //console.log(queryContent);
    
    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                //console.log(result);
            }
        }
    )
}

function createTags(tags, logID) {
    const arr = tags.split(', ');
    //console.log(arr);
    arr.forEach(tag => {
        db.query(
            `SELECT * FROM Tag WHERE tag = '${tag}'`,
            function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    //console.log(result);
                    if (!result[0]) {
                        insertTag(logID, tag);
                    } else {
                        connectTagToLog(logID, result[0].tagID);
                    }
                }
            }
        )
    });
}

function insertTag(logID, tag) {
    db.query(
        `INSERT INTO Tag (tagID, tag) VALUES (NULL, '${tag}')`,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                connectTagToLog(logID, result.insertId);
            }
        }
    )
}

function connectTagToLog(logID, tagID) {
    db.query(
        `INSERT INTO Log_has_Tag (logID, tagID) VALUES (${logID}, ${tagID})`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )
}

exports.createUserPlan = (req, res) => {
    const data = req.body;
    const username = data.username;
    const name = data.name;
    const start_date = data.start_date;
    const end_date = data.end_date;
    const description = data.description;
    const locations = data.locations;
    const activities = data.activities;

    let queryContent = `INSERT INTO Journey_Plan (planID, name, start_date, end_date, post_date, description) VALUES (NULL, '${name}', '${start_date}', '${end_date}', current_timestamp(), '${description}')`;
    //console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                //console.log(result);
                connectPlanToUser(username, result.insertId);
                if (locations) createLocations(locations, result.insertId);
                if (activities) createActivities(activities, result.insertId);
                res.send(result);
            }
        }
    )
}

function connectPlanToUser(username, planID) {
    let queryContent = `INSERT INTO User_has_Plan (username, planID) VALUES ('${username}', ${planID})`;
    //console.log(queryContent);
    
    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                //console.log(result);
            }
        }
    )
}

function createLocations(locations, planID) {
    const arr = locations.split(', ');
    //console.log(arr);
    arr.forEach(location => {
        db.query(
            `SELECT * FROM Location WHERE location = '${location}'`,
            function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    //console.log(result);
                    if (!result[0]) {
                        insertLocation(planID, location);
                    } else {
                        connectLocationToPlan(planID, result[0].locationID);
                    }
                }
            }
        )
    });
}

function insertLocation(planID, location) {
    db.query(
        `INSERT INTO Location (locationID, location) VALUES (NULL, '${location}')`,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                connectLocationToPlan(planID, result.insertId);
            }
        }
    )
}

function connectLocationToPlan(planID, locationID) {
    db.query(
        `INSERT INTO Plan_has_Location (planID, locationID) VALUES (${planID}, ${locationID})`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )
}

function createActivities(activities, planID) {
    const arr = activities.split(', ');
    //console.log(arr);
    arr.forEach(activity => {
        db.query(
            `SELECT * FROM Activity WHERE activity = '${activity}'`,
            function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    //console.log(result);
                    if (!result[0]) {
                        insertActivity(planID, activity);
                    } else {
                        connectActivityToPlan(planID, result[0].activityID);
                    }
                }
            }
        )
    });
}

function insertActivity(planID, activity) {
    db.query(
        `INSERT INTO Activity (activityID, activity) VALUES (NULL, '${activity}')`,
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                connectActivityToPlan(planID, result.insertId);
            }
        }
    )
}

function connectActivityToPlan(planID, activityID) {
    db.query(
        `INSERT INTO Plan_has_Activity (planID, activityID) VALUES (${planID}, ${activityID})`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )
}

exports.updateUserLog = (req, res) => {
    const data = req.body;
    const logID = data.logID;
    const title = data.title;
    const description = data.description;
    const start_date = data.start_date;
    const end_date = data.end_date;

    let queryContent = `UPDATE Travel_Log SET title = '${title}', description = '${description}', start_date = '${start_date}', end_date = '${end_date}' WHERE logID = ${logID}`;
    console.log(queryContent);

    db.query(
        queryContent,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.updateUserPlan = (req, res) => {
    const data = req.body;
    const planID = data.planID;
    const name = data.name;
    const start_date = data.start_date;
    const end_date = data.end_date;
    const description = data.description;

    let queryContent = `UPDATE Journey_Plan SET name = '${name}', start_date = '${start_date}', end_date = '${end_date}', description = '${description}' WHERE planID = ${planID}`;
    console.log(queryContent);

    db.query(
        queryContent,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.deleteUserLog = (req, res) => {
    const data = req.query;
    const logID = data.logID;

    db.query(
        `DELETE FROM User_has_Log WHERE logID = ${logID}`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )

    db.query(
        `DELETE FROM Log_has_Tag WHERE logID = ${logID}`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )

    db.query(
        `DELETE FROM Travel_Log WHERE logID = ${logID}`,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.deleteUserPlan = (req, res) => {
    const data = req.query;
    const planID = data.planID;

    db.query(
        `DELETE FROM User_has_Plan WHERE planID = ${planID}`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )

    db.query(
        `DELETE FROM Plan_has_Location WHERE planID = ${planID}`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )

    db.query(
        `DELETE FROM Plan_has_Activity WHERE planID = ${planID}`,
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    )

    db.query(
        `DELETE FROM Journey_Plan WHERE planID = ${planID}`,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}