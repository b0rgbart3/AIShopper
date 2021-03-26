import React, { useRef } from 'react';
// import { useShopprContext } from "../utils/GlobalState";
// import { LOADING, STOP_LOADING } from "../utils/actions";
// import API from "../utils/API";
import "./Login.scss";


function Login(){

    let user= useRef();
    let p = useRef();

    function submitCreds(e) {
        e.preventDefault();
        console.log(user);
        console.log(p);
    }
    return(
        <div className='login'>
        <h1>login:</h1>
        <form onSubmit={()=>submitCreds()}>
        <label>username</label>
            <input type='text' ref={user} autoComplete="username"></input>
            <label>password</label>
            <input type='password' autoComplete = "current-password" ref={p}></input>
            <input type='submit'></input>
        </form>
        </div>
    );

}

export default Login;