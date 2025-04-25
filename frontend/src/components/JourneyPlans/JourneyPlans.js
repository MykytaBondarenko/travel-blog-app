import './JourneyPlans.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JourneyPlans() {
    const [journeyPlansData, setJourneyPlansData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJourneyPlans();
    }, []);

    function fetchJourneyPlans(location, activity) {
        axios
            .get("http://localhost:5000/journeyPlans", {
                params: {
                    location: location,
                    activity: activity
                }
            })
            .then((response) => {
                setJourneyPlansData(response.data);
                setLoading(false);

                response.data.forEach(plan => {
                    fetchLocations(plan.planID);
                    fetchActivities(plan.planID);
                    fetchUser(plan.planID);
                });
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
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

    function fetchUser(planID) {
        axios
            .get("http://localhost:5000/journeyPlans/getUser", {
                params: {
                    planID: planID
                }
            })
            .then((response) => {
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [planID]: response.data
                }))
            })
            .catch((error) => {
                console.error(`Error fetching user for plan ${planID}`, error);
            })
    }

    function getJourneyPlansList() {
        let journeyPlansList;
        console.log(journeyPlansData);
        if (journeyPlansData.length < 1) {
            journeyPlansList = "Couldn't find the travel logs";
        }
        else {
            journeyPlansList = journeyPlansData.map(plan => <li class='objectBox'>{plan.name}
                                                            <p>User: {users[plan.planID]?(users[plan.planID][0]?users[plan.planID][0].username:"No user"):"No user"}</p>
                                                            <p>Description: {plan.description}</p>
                                                            <ul>{locations[plan.planID]?locations[plan.planID].map(location => <li class="liLocation">{location.Location}</li>):<li>Loading locations...</li>}</ul>
                                                            <ul>{activities[plan.planID]?activities[plan.planID].map(activity => <li class="liActivity">{activity.Activity}</li>):<li>Loading activities...</li>}</ul>
                                                            <p>Start: {new Date(plan.start_date).toDateString()}</p>
                                                            <p>End: {new Date(plan.end_date).toDateString()}</p>
                                                            <p>Posted: {new Date(plan.post_date).toDateString()}</p>
                                                        </li>)
        }
        return journeyPlansList;
    }

    console.log(journeyPlansData);
    let journeyPlansList = getJourneyPlansList();

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    return (
        <div>
            <h1>Journey Plans</h1>
            <div id="inputDiv">
                <div>
                    <input type="text" id="location" placeholder="Location" class="findObject"></input>
                    <input type="text" id="activity" placeholder="Activity" class="findObject"></input>
                    <button onClick={()=>{fetchJourneyPlans(document.getElementById('location').value, document.getElementById('activity').value)}}>Search journey plans</button>
                </div>
            </div>
            <ul id="objectsUL">{journeyPlansList}</ul>
        </div>
    )
}