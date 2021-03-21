import React, {useRef} from "react";

import "../App.css";
import "./SearchComponent.css";

const SearchComponent = (props) => {
    const url = useRef();
    return (
      <>
        <form onSubmit={(e)=>props.validateUrl(e,url.current.value)}>
          <input ref={url}></input>
        </form>
      </>
    ); 
  }
  
  export default SearchComponent;