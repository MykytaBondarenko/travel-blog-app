import './LoginPage.css';
import React, {useState} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import userIcon from '../Assets/user.svg';
import emailIcon from '../Assets/email.svg';
import passwordIcon from '../Assets/password.svg';
import eyeOpenIcon from '../Assets/eye-open.svg';
import eyeClosedIcon from '../Assets/eye-closed.svg';

export default function Login({ sendLoggedInToApp, sendCurrentUserToApp }) {

    const [action, setAction] = useState("Login");
    const [seePwd, setSeePwd] = useState(false);

    async function signUpUser() {
        const username = document.getElementById('usernameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const passwordHash = await bcrypt.hash(password, 10).then();
        axios
            .post("http://localhost:5000/login", {
                username: username,
                email: email,
                password: passwordHash
            })
            .then((response) => {
                console.log(response);
                if (response.data.affectedRows) {
                    alert(`Successfully created a profile under the username ${username}`);
                    sendCurrentUserToApp(username);
                    sendLoggedInToApp(true);
                } else if (response.data.code) {
                    alert(`Error occured: ${response.data.code}`);
                } else {
                    alert(`Error occured!`);
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
    }

    async function loginUser() {
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        
        axios
            .get('http://localhost:5000/login/passwordhash', {
                params: {
                    username: username
                }
            })
            .then(async (response) => {
                console.log(response);
                if (!response.data[0]) {
                    alert(`Couldn't find user ${username}`);
                } else {
                    const passwordHash = response.data[0].password;
                    const isMatch = await bcrypt.compare(password, passwordHash);
                    if (isMatch) {
                        alert(`Successfully logged in! :D`);
                        sendCurrentUserToApp(username);
                        sendLoggedInToApp(true);
                    } else {
                        alert(`Wrong password`);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={userIcon}></img>
                    <input type='text' placeholder='Username' id='usernameInput'></input>
                </div>
                {action==="Login"?<div></div>:<div className='input'>
                                                <img src={emailIcon}></img>
                                                <input type='email' placeholder='Email' id='emailInput'></input>
                                            </div>}
                
                <div className='input'>
                    <img src={passwordIcon}></img>
                    <input type={seePwd?'text':'password'} placeholder='Password' id='passwordInput'></input>
                    <img src={seePwd?eyeClosedIcon:eyeOpenIcon} id="seePassword" onClick={()=>{seePwd?setSeePwd(false):setSeePwd(true)}}></img>
                </div>
            </div>
            <div className="submit-container">
                {action==="Login"?<div className='submit' onClick={()=>{loginUser()}}>Submit</div>:<div className='submit' onClick={()=>{signUpUser()}}>Submit</div>}
                
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}