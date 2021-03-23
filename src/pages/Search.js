import React, {useState, useRef, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../utils/GlobalState";
import { ENTER_URL, STOP_LOADING, SEARCH_SAVED, ADD_SEARCH_DETAIL } from "../utils/actions";
import "./Search.scss";
import API from "../utils/API";

function Search(){
    const history = useHistory();
    const [state, dispatch ] = useShopprContext();
    const url = useRef();
    const [localUrl, setLocalUrl] = useState('');

    useEffect(() => {
      console.log('Entering the search page:', localUrl);

     // dispatch({ type: ENTER_URL, url: '' });
    }, [localUrl]);

    function saveSearch(payload) {
      console.log("payload to save search: ", payload);
      API.saveSearch(payload)
        .then((response) => {
          console.log("Search saved", response.data);
          dispatch({ type: SEARCH_SAVED, searchSaved: true });
        })
        .catch((err) => {
          console.log("Save not successfull");
        })
        .finally(() => {
          console.log("Finally done saving the search, about to update state.");
          dispatch({ type: ADD_SEARCH_DETAIL, newSearch: payload.itemNames });
        });
  
     
    }

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
    function analyze() {


      API.checkIfUrlWasAlreadyAnalyzed(state.CurrentSearch.image_url).then(
        (existingSearches) => {
          console.log("Back from the API, length:");
         // setExistingSearch(existingSearches);
          console.log(existingSearches.data.length);
          if (existingSearches.data.length <= 0 ) {
              console.log('didnt find this as a previous search');
              // Didn't find a previous search, so we need to send it to 
              // the GoogleAPI

              API.extractUrl(state.CurrentSearch.image_url)
              .then((res) => {
              console.log("here is the image uploaded res", res);

              // Let's just SAVE ALL THE SEARCHES that are fresh images
              // even if there is no logged in user.
              let thisUserId = 1;
              if (state.User) {
                  thisUserId = state.User.id;
              }
              let payload = { UserId: thisUserId, image_url: state.CurrentSearch.image_url,
                  itemNames: res.data };
              saveSearch( payload );

              // if (res.data && res.data.items && res.data.items.length > 0) {
              //     history.push("/result");
              // } else {
              //     // addToast(
              //     // `No results found, please try uploading a clearer image`,
              //     // {
              //     //     appearance: "warning",
              //     //     autoDismiss: true,
              //     // }
              //     // );
              // }
              })
              .catch((err) => {
              console.log(err);
              dispatch({ type: STOP_LOADING });
              });

          } else {
              console.log('Found this as an existing searched url.');
          }
     });


     
      // history.push('/analyze');
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
          <img src={state.CurrentSearch.image_url} alt='about_to_analyze'/>
          </div>
          <button className='pill-style' onClick={analyze}>Analyze this image</button>
      
        </div> ) : ( <div></div> ) }
      </div>     
    );
}

export default Search;