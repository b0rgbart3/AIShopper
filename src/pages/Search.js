import React, {useRef} from 'react';
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import { ENTER_URL } from "../utils/actions";
import "./Search.scss";


function Search(){
    const history = useHistory();
    const [state, dispatch ] = useShopprContext();
    const url = useRef();

    // when the user enters a url, this function will validate it
    function validateUrl(e, urlString) {
        e.preventDefault();
        console.log(urlString);
        let tempUrlString = urlString.trim();
        let regex = /(http(s?):)*\.(?:jpg|png)/;
        if (tempUrlString.match(regex)) {
            dispatch({ type: ENTER_URL, url: tempUrlString });
            console.log("about to redirect.");
            history.push('/analyze');
        } else {

           dispatch({ type: ENTER_URL, url: "" });
        //    addToast(`Please enter a url that ends in .jpg or .png`, {
        //     appearance: "info",
        //     autoDismiss: false,
        //   });
        }

    }

    return (
      <div className='search'>
        <h1>enter an image url:</h1>
        <form onSubmit={(e)=>validateUrl(e,url.current.value)}>
            <input ref={url} type="text" />
            <input type='submit' value='search' />
        </form> 
      </div>     
    );
}

export default Search;