import React, { useRef } from "react";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import { LOGIN, TOAST, LOADING, STOP_LOADING } from "../utils/actions";
// import API from "../utils/API";
import "../App.scss";
import "./Login.scss";

function Login() {
  const [state, dispatch] = useShopprContext();
  const history = useHistory();

  let email = useRef();
  let newEmail = useRef();
  let p = useRef();
  let newP = useRef();
  let user = state.user;

  if (user) {
    history.push("/");
  }

  function loginUser(userCreds) {
    console.log("Logging in the user.");
    API.login(userCreds)
      .then((newUser) => {
        //  console.log("GOT this user: ", newUser);
        if (newUser.status === 200) {
          console.log("Logged in new user: ", newUser);
          dispatch({ type: LOGIN, user: newUser.data });
          dispatch({
            type: TOAST,
            action: { toast: "Success", message: "You are now logged in." },
          });
          console.log("ABOUT TO REDIRECT");
          history.push("/search");
        } else {
          dispatch({
            type: TOAST,
            action: {
              toast: "Error",
              message: "Your credentials are not matching our records.",
            },
          });
          console.log("Error logging in.");
          throw Error("Error logging in.");
        }
      })
      .catch((err) => {
        console.log("Dispatching an Error from the Login Component: ");
        dispatch({
          type: TOAST,
          toast: { type: "error", message: "Bad Login" },
        });
      });
  }

  function submitCreds(e) {
    e.preventDefault();

    //  console.log("ABOUT TO SUBMIT CREDENTIALS");
    if (email.current.value && p.current.value) {
      let UserCreds = {
        email: email.current.value,
        p: p.current.value,
      };

      loginUser(UserCreds);
    }
  }
  function createCreds(e) {
    e.preventDefault();

    if (newEmail.current.value && newP.current.value) {
      let UserCreds = {
        email: newEmail.current.value,
        p: newP.current.value,
        admin: false
      };

      API.create(UserCreds)
        .then((newUser) => {
          console.log("Back from the api: ", newUser.data);
          if (newUser.data === false) {
            console.log("Error creating user: ");
            dispatch({
              type: TOAST,
              toast: {
                type: "error",
                message: "Couldn't create your account - please try again later.",
              },
            });
          } else {
          loginUser(UserCreds).then((newUser) => {
            console.log("Created a new user and logged them in:", newUser);
              console.log("Calling dispatcher.");
              dispatch({
                type: TOAST,
                toast: { type: "success", message: "Created your account." },
              });
              //  console.log("Back from dispatcher.");
          });
        }
        })
        .catch((err) => {
          console.log("Error creating user: ", err);
          dispatch({
            type: TOAST,
            toast: {
              type: "error",
              message: "Couldn't create your account - please try again later.",
            },
          });
        });
    }
  }

  API.getUsers()
    .then((users) => {
      // console.log("Got users:", users);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="creds">
      <div className="login">
        <h1>Login:</h1>
        <form onSubmit={(e) => submitCreds(e)}>
          <label>email</label>
          <input type="text" ref={email} autoComplete="email"></input>
          <label>password</label>
          <input
            type="password"
            autoComplete="current-password"
            ref={p}
          ></input>
          <input type="submit" value="login" />
        </form>
      </div>
      <div className="create">
        <h1>Create a new account:</h1>
        <form onSubmit={(e) => createCreds(e)}>
          <label>email</label>
          <input type="text" ref={newEmail} autoComplete="email"></input>
          <label>password</label>
          <input
            type="password"
            autoComplete="current-password"
            ref={newP}
          ></input>
          <input type="submit" value="create" />
        </form>
      </div>
    </div>
  );
}

export default Login;
