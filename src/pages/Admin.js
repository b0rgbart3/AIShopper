import React, { useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import {
  REMOVE_USER,
  RETRIEVED_USERS,
} from "../utils/actions";
import { Link } from "react-router-dom";
import Hero from "../assets/hero.jpg";
import "./Home.scss";
import "../App.scss";
import API from "../utils/API";

function AdminPage(){
  const [state, dispatch] = useShopprContext();
  const history = useHistory();
  let user = state.user;
  let users = state.users;

  if (!user || !user.admin) {
    history.push("/");
  }

  function deleteUser(id) {
    console.log("About to delete user: ", id); 
    API.deleteUser(id)
    .then((response) => {
      console.log("Back from the API.");
      if (response) {
      dispatch({
        type: REMOVE_USER,
        userId: id,
      });
    }
    })
    .catch((err) => {
      console.log("In catch block of getUsers, with err: ", err);
    }); 
  }

  useEffect(() => {
    if (!users) {
      API.getUsers()
        .then((response) => {
          const data = response.data;
          dispatch({
            type: RETRIEVED_USERS,
            users: data,
          });
        })
        .catch((err) => {
          console.log("In catch block of getUsers, with err: ", err);
        });
    }
  }, []);

  return (
  <div className="panel">
  <div className="rowHeader">
    user
  </div>
  {state.users?.map((user) => (
   <div className='row'>{user.username}
   
   &nbsp; &nbsp;ID: {user.id}&nbsp;&nbsp;
   &nbsp; &nbsp;email: {user.email}&nbsp;&nbsp;|
   &nbsp; &nbsp;admin: {user.admin}|&nbsp;&nbsp;

   <span className='utilityBtn'
   
   onClick={() => {deleteUser(user.id);}} data-id={user.id}>Delete User</span>
   </div> 
  ))
  }
    <div>

    </div>
  </div>
);
  }

export default AdminPage;
