import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./SearchComponent.css";
import "./AnalyzeImageComponent.css";

const AnalyzeImageComponent = (props) => {

    return (
      <>
        <div className='analyzeImage'>
          <img src={props.url} />
          <Link to="/analyze" className='pill'>Analyze this image</Link>
        </div>
        
      </>
    ); }

export default AnalyzeImageComponent;