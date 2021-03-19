import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./SearchComponent.css";

const SearchComponent = (props) => {

    return (
      <>
        <form onSubmit={props.validateUrl}>
          <input></input>
        </form>
      </>
    ); 
  }
  
  export default SearchComponent;