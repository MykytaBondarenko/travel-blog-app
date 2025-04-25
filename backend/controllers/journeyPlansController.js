const db = require('../database.js');

exports.getJourneyPlansData = (req, res) => {
    const data = req.query;
    const location = data.location ? data.location : undefined;
    const activity = data.activity ? data.activity : undefined;

    let queryContent;
    console.log("location: ", location);
    console.log("activity: ", activity);
    if (location == undefined && activity == undefined) {
        queryContent = `SELECT * FROM Journey_Plan ORDER BY start_date`;
    } else if (location != undefined && activity != undefined) {
        queryContent = `SELECT Journey_Plan.* FROM Journey_Plan, Location, Plan_has_Location, Activity, Plan_has_Activity WHERE Location.location = '${location}' AND Location.locationID = Plan_has_Location.locationID AND Plan_has_Location.planID = Journey_Plan.planID AND Activity.activity = '${activity}' AND Activity.activityID = Plan_has_Activity.activityID AND Plan_has_Activity.planID = Journey_Plan.planID ORDER BY start_date`;
    } else if (location != undefined) {
        queryContent = `SELECT Journey_Plan.* FROM Journey_Plan, Location, Plan_has_Location WHERE Location.location = '${location}' AND Location.locationID = Plan_has_Location.locationID AND Plan_has_Location.planID = Journey_Plan.planID ORDER BY start_date`;
    } else {
        queryContent = `SELECT Journey_Plan.* FROM Journey_Plan, Activity, Plan_has_Activity WHERE Activity.activity = '${activity}' AND Activity.activityID = Plan_has_Activity.activityID AND Plan_has_Activity.planID = Journey_Plan.planID ORDER BY start_date`;
    }
    console.log(queryContent);

    db.query(
        queryContent,
        function(error, result) {
            if(error) {
                console.log(error);
                res.sent(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.getJourneyPlansLocations = (req, res) => {
    const data = req.query;
    const planID = data.planID;

    let queryContent = `SELECT Location.Location FROM Location, Plan_has_Location WHERE Plan_has_Location.planID = ${planID} AND Plan_has_Location.locationID = Location.locationID`;
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

exports.getJourneyPlansActivities = (req, res) => {
    const data = req.query;
    const planID = data.planID;

    let queryContent = `SELECT Activity.Activity FROM Activity, Plan_has_Activity WHERE Plan_has_Activity.planID = ${planID} AND Plan_has_Activity.activityID = Activity.activityID`;
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

exports.getJourneyPlanUser = (req, res) => {
    const data = req.query;
    const planID = data.planID;

    let queryContent = `SELECT username FROM User_has_Plan WHERE User_has_Plan.planID = ${planID}`;
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