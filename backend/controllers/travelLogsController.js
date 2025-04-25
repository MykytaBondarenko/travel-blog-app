const db = require('../database.js');

exports.getTravelLogsData = (req, res) => {
    const data = req.query;
    const tag = data.tag ? data.tag : undefined;

    let queryContent;
    console.log("tag: ", tag);
    if (tag == undefined) queryContent = `SELECT * FROM Travel_Log ORDER BY start_date`;
    else queryContent = `SELECT Travel_Log.* FROM Travel_Log, Tag, Log_has_Tag WHERE Tag.tag = '${tag}' AND Tag.tagID = Log_has_Tag.tagID AND Log_has_Tag.logID = Travel_Log.logID ORDER BY start_date`;
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

exports.getTravelLogsTags = (req, res) => {
    const data = req.query;
    const logID = data.logID;

    let queryContent = `SELECT Tag.Tag FROM Tag, Log_has_Tag WHERE Log_has_Tag.logID = ${logID} AND Log_has_Tag.tagID = Tag.tagID`;
    //console.log(queryContent);

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

exports.getTravelLogUser = (req, res) => {
    const data = req.query;
    const logID = data.logID;

    let queryContent = `SELECT username FROM User_has_Log WHERE User_has_Log.logID = ${logID}`;
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