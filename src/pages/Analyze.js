import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import { STOP_LOADING, SEARCH_SAVED, ADD_SEARCH_DETAIL } from "../utils/actions";
import API from "../utils/API";

function Analyze(){
    const history = useHistory();
    const [existingSearch, setExistingSearch] = useState([]);
    const [state, dispatch ] = useShopprContext();

        console.log('About to analyze image:', state.CurrentSearch.image_url);
      
  



    return (
       <>
       <div>
        
       </div>
       </>
    );
}

export default Analyze;