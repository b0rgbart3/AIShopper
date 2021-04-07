import React, { useRef } from 'react';
import API from '../utils/API';
import { useShopprContext } from "../utils/GlobalState";
import { LOGIN, LOADING, STOP_LOADING } from "../utils/actions";
// import API from "../utils/API";
import "../App.scss";
import "./Login.scss";



function Login(){
    const [state, dispatch] = useShopprContext();

    let email= useRef();
    let newEmail = useRef();
    let p = useRef();
    let newP = useRef();

    function submitCreds(e) {
        e.preventDefault();
        
        if (email.current.value && p.current.value) {
            let User = {
                email: email.current.value,
                p: p.current.value
            };

            API.login(User)
                .then((newUser) => {
                    console.log("Logged in new user: ", newUser);
                    dispatch({ type: LOGIN, user: newUser.data });

                })
                .catch((err) => {
                    console.log("Error logging in: ", err);
                })
        }
    }
    function createCreds(e) {
        e.preventDefault();
        
        if (newEmail.current.value && newP.current.value) {
            let User = {
                email: newEmail.current.value,
                p: newP.current.value
            };

            API.create(User)
                .then((newUser) => {
                    console.log("Created new user:", newUser);
                })
                .catch((err) => {
                    console.log("Error creating user: ", err);
                })
        }
    }

    API.getUsers().then((users)=> {
        console.log("Got users:", users);
    }).catch((err) => {console.log(err)});

    return(
      
        <div className='creds'>
            <div className='login'>
                <h1>login to your existing account:</h1>
                <form onSubmit={(e)=>submitCreds(e)}>
                <label>email</label>
                    <input type='text' ref={email} autoComplete="email"></input>
                    <label>password</label>
                    <input type='password' autoComplete = "current-password" ref={p}></input>
                    <input type='submit' value='login' />
                </form>
            </div>
            <div className='create'>
            <h1>or create a new account:</h1>
            <form onSubmit={(e)=>createCreds(e)}>
            <label>email</label>
                <input type='text' ref={newEmail} autoComplete="email"></input>
                <label>password</label>
                <input type='password' autoComplete = "current-password" ref={newP}></input>
                <input type='submit' value='create' />
            </form>
            </div>
        </div>
    );

}

export default Login;