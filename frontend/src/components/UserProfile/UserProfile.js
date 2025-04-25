import './UserProfile.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserProfile({ currentUser, sendLoggedInToApp, sendCurrentUserToApp }) {

    const [userData, setUserData] = useState([]);
    const [userLogsData, setUserLogsData] = useState([]);
    const [userPlansData, setUserPlansData] = useState([]);
    const [tags, setTags] = useState([]);
    const [locations, setLocations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUser();
        fetchUserLogs();
        fetchUserPlans();
    }, []);

    function signOut() {
        sendCurrentUserToApp("");
        sendLoggedInToApp(false);
    }

    function fetchUser() {
        axios
            .get("http://localhost:5000/user", {
                params: {
                    username: currentUser
                }
            })
            .then((response) => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    function fetchUserLogs() {
        axios
            .get("http://localhost:5000/user/getLogs", {
                params: {
                    username: currentUser
                }
            })
            .then((response) => {
                setUserLogsData(response.data);
                setLoading(false);

                response.data.forEach(log => {
                    fetchTags(log.logID);
                });
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    function fetchUserPlans() {
        axios
            .get("http://localhost:5000/user/getPlans", {
                params: {
                    username: currentUser
                }
            })
            .then((response) => {
                setUserPlansData(response.data);
                setLoading(false);

                response.data.forEach(plan => {
                    fetchLocations(plan.planID);
                    fetchActivities(plan.planID);
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

    function fetchLocations(planID) {
        axios
            .get("http://localhost:5000/journeyPlans/getLocations", {
                params: {
                    planID: planID
                }
            })
            .then((response) => {
                setLocations(prevLocations => ({
                    ...prevLocations,
                    [planID]: response.data
                }))
            })
            .catch((error) => {
                console.error(`Error fetching locations for plan ${planID}:`, error);
            })
    }

    function fetchActivities(planID) {
        axios
            .get("http://localhost:5000/journeyPlans/getActivities", {
                params: {
                    planID: planID
                }
            })
            .then((response) => {
                setActivities(prevActivities => ({
                    ...prevActivities,
                    [planID]: response.data
                }))
            })
            .catch((error) => {
                console.error(`Error fetching activities for plan ${planID}:`, error);
            })
    }

    async function updateEmail() {
        const emailPattern = "@.+\\..+";
        const email = prompt("Enter your new email: ", userData[0].email);
        if (!email) {
            alert("No email was entered");
            return;
        }
        if (!email.match(emailPattern)) {
            alert("Wrong format of an email");
            return;
        }

        await axios
            .put("http://localhost:5000/user/updateEmail", {
                username: currentUser,
                email: email
            })
            .then((response) => {
                console.log(response);
                fetchUser();
            })
            .catch((error) => {
                console.log(error);
                alert("There was an error updating email: ", error);
            })
    }

    function updateAddress() {
        const address = prompt("Enter your new address: ", userData[0].address);
        if (!address) {
            alert("No address was entered");
            return;
        }

        axios
            .put("http://localhost:5000/user/updateAddress", {
                username: currentUser,
                address: address
            })
            .then((response) => {
                console.log(response);
                fetchUser();
            })
            .catch((error) => {
                console.log(error);
                alert("There was an error updating address: ", error);
            })
    }

    function createUserLog() {
        const title = prompt("Enter travel log's title: ");
        if (!title) {
            alert("No title was entered");
            return;
        }
        const description = prompt("Enter travel log's description: ");
        if (!description) {
            alert("No description was entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        const start_date = prompt("Enter travel log's start date (in a YYYY-MM-DD format): ");
        if (!start_date) {
            alert("No date was entered");
            return;
        }
        if (!start_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const end_date = prompt("Enter travel log's end date (in a YYYY-MM-DD format): ");
        if (!end_date) {
            alert("No date was entered");
            return;
        }
        if (!end_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const tags = prompt("Enter travel log's tags (separated by comma, without hashtags): ", "fun, happy, sunny");
        
        axios
            .post("http://localhost:5000/user/createLog", {
                username: currentUser,
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date,
                tags: tags
            })
            .then((response) => {
                console.log(response);
                fetchUserLogs();
            })
    }

    function createUserPlan() {
        const name = prompt("Enter journey plan's name: ");
        if (!name) {
            alert("No title was entered");
            return;
        }
        const description = prompt("Enter journey plan's description: ");
        if (!description) {
            alert("No description was entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        const start_date = prompt("Enter journey plan's start date (in a YYYY-MM-DD format): ");
        if (!start_date) {
            alert("No date was entered");
            return;
        }
        if (!start_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const end_date = prompt("Enter journey plan's end date (in a YYYY-MM-DD format): ");
        if (!end_date) {
            alert("No date was entered");
            return;
        }
        if (!end_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const locations = prompt("Enter journey plan's locations (separated by comma): ", "Maynooth University, Kildare, Ireland");
        const activities = prompt("Enter journey plan's activities (separated by comma): ", "studying, coding, smth else");
        
        axios
            .post("http://localhost:5000/user/createPlan", {
                username: currentUser,
                name: name,
                start_date: start_date,
                end_date: end_date,
                description: description,
                locations: locations,
                activities: activities
            })
            .then((response) => {
                console.log("test:",response);
                fetchUserPlans();
            })
    }

    function updateUserLog(log) {
        const title = prompt("Enter travel log's new title: ", log.title);
        if (!title) {
            alert("No title was entered");
            return;
        }
        const description = prompt("Enter travel log's new description: ", log.description);
        if (!description) {
            alert("No description was entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        const date_start_date = new Date(log.start_date);
        const start_date = prompt("Enter travel log's new start date (in a YYYY-MM-DD format): ", (date_start_date.getFullYear()+"-"+((date_start_date.getMonth()+1)>9?(date_start_date.getMonth()+1):"0"+(date_start_date.getMonth()+1))+"-"+(date_start_date.getDate()>9?date_start_date.getDate():"0"+date_start_date.getDate())));
        if (!start_date) {
            alert("No date was entered");
            return;
        }
        if (!start_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const date_end_date = new Date(log.end_date);
        const end_date = prompt("Enter travel log's new end date (in a YYYY-MM-DD format): ", (date_end_date.getFullYear()+"-"+((date_end_date.getMonth()+1)>9?(date_end_date.getMonth()+1):"0"+(date_end_date.getMonth()+1))+"-"+(date_end_date.getDate()>9?date_end_date.getDate():"0"+date_end_date.getDate())));
        if (!end_date) {
            alert("No date was entered");
            return;
        }
        if (!end_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }

        axios
            .put("http://localhost:5000/user/updateLog", {
                logID: log.logID,
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date
            })
            .then((response) => {
                console.log(response);
                fetchUserLogs();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateUserPlan(plan) {
        const name = prompt("Enter journey plan's new name: ", plan.name);
        if (!name) {
            alert("No name was entered");
            return;
        }
        const description = prompt("Enter journey plan's new description: ", plan.description);
        if (!description) {
            alert("No description was entered");
            return;
        }
        const datePattern = "^\\d{4}-\\d{2}-\\d{2}$";
        const date_start_date = new Date(plan.start_date);
        const start_date = prompt("Enter journey plan's new start date (in a YYYY-MM-DD format): ", (date_start_date.getFullYear()+"-"+((date_start_date.getMonth()+1)>9?(date_start_date.getMonth()+1):"0"+(date_start_date.getMonth()+1))+"-"+(date_start_date.getDate()>9?date_start_date.getDate():"0"+date_start_date.getDate())));
        if (!start_date) {
            alert("No date was entered");
            return;
        }
        if (!start_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }
        const date_end_date = new Date(plan.end_date);
        const end_date = prompt("Enter journey plan's new end date (in a YYYY-MM-DD format): ", (date_end_date.getFullYear()+"-"+((date_end_date.getMonth()+1)>9?(date_end_date.getMonth()+1):"0"+(date_end_date.getMonth()+1))+"-"+(date_end_date.getDate()>9?date_end_date.getDate():"0"+date_end_date.getDate())));
        if (!end_date) {
            alert("No date was entered");
            return;
        }
        if (!end_date.match(datePattern)) {
            alert("Wrong format of a date");
            return;
        }

        axios
            .put("http://localhost:5000/user/updatePlan", {
                planID: plan.planID,
                name: name,
                start_date: start_date,
                end_date: end_date,
                description: description
            })
            .then((response) => {
                console.log(response);
                fetchUserPlans();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteUserLog(logID) {
        axios
            .delete("http://localhost:5000/user/deleteLog", {
                params: {
                    logID: logID
                }
            })
            .then((response) => {
                console.log(response);
                fetchUserLogs();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteUserPlan(planID) {
        axios
            .delete("http://localhost:5000/user/deletePlan", {
                params: {
                    planID: planID
                }
            })
            .then((response) => {
                console.log(response);
                fetchUserPlans();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getLogsList() {
        let logsList;
        if (userLogsData.length < 1) {
            logsList = "Couldn't find user's travel logs";
        }
        else {
            logsList = userLogsData.map(log => <li class='objectBoxUser'>{log.title}
                                                            <p>{log.description}</p>
                                                            <ul>{tags[log.logID]?tags[log.logID].map(tag => <li class="liTag">#{tag.Tag}</li>):<li>Loading tags...</li>}</ul>
                                                            <p>Start: {new Date(log.start_date).toDateString()}</p>
                                                            <p>End: {new Date(log.end_date).toDateString()}</p>
                                                            <p>Posted: {new Date(log.post_date).toDateString()}</p>
                                                            <div id="inputDivUser">
                                                                <button onClick={()=>{updateUserLog(log)}}>Update</button>
                                                                <button onClick={()=>{deleteUserLog(log.logID)}}>Delete</button>
                                                            </div>
                                                        </li>)
        }
        return logsList;
    }

    function getPlansList() {
        let plansList;
        if (userPlansData.length < 1) {
            plansList = "Couldn't find user's journey plans";
        }
        else {
            plansList = userPlansData.map(plan => <li class='objectBoxUser'>{plan.name}
                                                            <p>{plan.description}</p>
                                                            <ul>{locations[plan.planID]?locations[plan.planID].map(location => <li class='liLocation'>{location.Location}</li>):<li>Loading locations...</li>}</ul>
                                                            <ul>{activities[plan.planID]?activities[plan.planID].map(activity => <li class='liActivity'>{activity.Activity}</li>):<li>Loading activities...</li>}</ul>
                                                            <p>Start: {new Date(plan.start_date).toDateString()}</p>
                                                            <p>End: {new Date(plan.end_date).toDateString()}</p>
                                                            <p>Posted: {new Date(plan.post_date).toDateString()}</p>
                                                            <div id="inputDivUser">
                                                                <button onClick={()=>{updateUserPlan(plan)}}>Update</button>
                                                                <button onClick={()=>{deleteUserPlan(plan.planID)}}>Delete</button>
                                                            </div>
                                                        </li>)
        }
        return plansList;
    }

    let logsList = getLogsList();
    let plansList = getPlansList();

    if (error) return (<div>Error: {error}</div>);

    return (
        <div>
            <div id="inputDivUser">
                <h1 id="h1User">{currentUser}</h1>
                <button onClick={()=>{signOut()}}>Sign out</button>
            </div>
            {!loading?<div class="userInfo">
                <div>
                    <p>Email: {userData[0]?(userData[0].email?userData[0].email:"Loading..."):"Loading..."}</p>
                    <button onClick={()=>{updateEmail()}}>Change email</button>
                </div>
                <div>
                    <p>Address: {userData[0]?(userData[0].address?userData[0].address:""):"Loading..."}</p>
                    <button onClick={()=>{updateAddress()}}>{userData[0].address?"Change ":"Add "} address</button>
                </div>
            </div>:<div id="userInfo">Loading data about the user...</div>}
            <hr></hr>
            <div>
                <div id="inputDivUser">
                    <h2>Travel Logs:</h2>
                    <button onClick={()=>{createUserLog()}}>Add a new log</button>
                </div>
            </div>
            <ul id="objectsULUser">{logsList}</ul>
            <hr></hr>
            <div>
                <div id="inputDivUser">
                    <h2>Journey plans:</h2>
                    <button onClick={()=>{createUserPlan()}}>Add a new plan</button>
                </div>
            </div>
            <ul id="objectsULUser">{plansList}</ul>
        </div>
    )
}