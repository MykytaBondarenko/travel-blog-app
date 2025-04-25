import './TravelLogs.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TravelLogs() {
    const [travelLogsData, setTravelLogsData] = useState([]);
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchTravelLogs();
    }, []);

    function fetchTravelLogs(tag) {
        axios
            .get("http://localhost:5000/travelLogs", {
                params: {
                    tag: tag
                }
            })
            .then((response) => {
                setTravelLogsData(response.data);
                setLoading(false);

                response.data.forEach(log => {
                    fetchTags(log.logID);
                    fetchUser(log.logID);
                });
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    function fetchTags(logID) {
        axios
            .get("http://localhost:5000/travelLogs/getTags", {
                params: {
                    logID: logID
                }
            })
            .then((response) => {
                setTags(prevTags => ({
                    ...prevTags,
                    [logID]: response.data
                }))
            })
            .catch((error) => {
                console.error(`Error fetching tags for log ${logID}:`, error);
            })
    }

    function fetchUser(logID) {
        axios
            .get("http://localhost:5000/travelLogs/getUser", {
                params: {
                    logID: logID
                }
            })
            .then((response) => {
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [logID]: response.data
                }))
            })
            .catch((error) => {
                console.error(`Error fetching user for log ${logID}`, error);
            })
    }
    
    function getTravelLogsList() {
        let travelLogsList;
        console.log(travelLogsData);
        if (travelLogsData.length < 1) {
            travelLogsList = "Couldn't find the travel logs";
        }
        else {
            travelLogsList = travelLogsData.map(log => <li class='objectBox'>{log.title}
                                                            <p>User: {users[log.logID]?(users[log.logID][0]?users[log.logID][0].username:"No user"):"No user"}</p>
                                                            <p>{log.description}</p>
                                                            <ul>{tags[log.logID]?tags[log.logID].map(tag => <li class='liTag'>#{tag.Tag}</li>):<li>Loading tags...</li>}</ul>
                                                            <p>Start: {new Date(log.start_date).toDateString()}</p>
                                                            <p>End: {new Date(log.end_date).toDateString()}</p>
                                                            <p>Posted: {new Date(log.post_date).toDateString()}</p>
                                                        </li>)
        }
        return travelLogsList;
    }

    console.log(travelLogsData);
    let travelLogsList = getTravelLogsList();

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    return (
        <div>
            <h1>Travel Logs</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="tag" placeholder="Tag" class="findObject"></input>
                    <button onClick={()=>{fetchTravelLogs(document.getElementById('tag').value)}}>Search travel logs</button>
                </div>
            </div>
            <ul id="objectsUL">{travelLogsList}</ul>
        </div>
    )
}