import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import "./Analyze.css";


function Analyze(){

    const history = useHistory();
    const [state, dispatch ] = useShopprContext();
    console.log("in Analyze, image_url==", state.CurrentSearch.image_url);

    // if there is no valid url, go back to the search page
    if (state.CurrentSearch.image_url === '') {
        history.push("/search");
    }
    return(

        <>
          <div className='analyzeImage'>
          <img src={state.CurrentSearch.image_url} />
          <Link to="/analyze" className='pill'>Analyze this image</Link>
        </div>
        </>
    );
}

export default Analyze;