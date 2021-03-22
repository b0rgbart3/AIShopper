import React, {useState, useRef, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import { ENTER_URL } from "../utils/actions";
import "./Search.scss";


function Search(){
    const history = useHistory();
    const [state, dispatch ] = useShopprContext();
    const url = useRef();
    const [localUrl, setLocalUrl] = useState('');

    useEffect(() => {
      console.log('Entering the search page:', localUrl);

     // dispatch({ type: ENTER_URL, url: '' });
    }, [localUrl]);

    // when the user enters a url, this function will validate it
    function validateUrl(e, urlString) {
        e.preventDefault();
        console.log(urlString);
        let tempUrlString = urlString.trim();
        let regex = /(http(s?):)*\.(?:jpg|png)/;
        if (tempUrlString.match(regex)) {
            setLocalUrl(tempUrlString);
            dispatch({ type: ENTER_URL, url: tempUrlString });
            console.log("Local url: ", localUrl);
            // console.log("about to redirect.");
            // history.push('/view');
        } else {

           dispatch({ type: ENTER_URL, url: "" });
        //    addToast(`Please enter a url that ends in .jpg or .png`, {
        //     appearance: "info",
        //     autoDismiss: false,
        //   });
        }

    }
    function analyze(e) {
        
    }

    return (
      <div className='search'>
        <h1>enter an image url:</h1>
        <form onSubmit={(e)=>validateUrl(e,url.current.value)}>
            <input ref={url} type="text"/>
            <input type='submit' value='enter' />
        </form> 

{ localUrl !== '' ? (
        <div className='analyze'>
          <div className='analyzeImage'>
          <img src={state.CurrentSearch.image_url} />
          </div>
          <button className='pill-style' onClick={analyze}>Analyze this image</button>
      
        </div> ) : ( <div></div> ) }
      </div>     
    );
}

export default Search;