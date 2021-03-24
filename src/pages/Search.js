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
    const [localSearches, setLocalSearches] = useState([]);

    // useEffect(() => {
    //   console.log('Entering the search page:', localUrl);

    //  // dispatch({ type: ENTER_URL, url: '' });
    // }, [localUrl]);

    useEffect(()=> {

      API.getSearches().then((response) => {
        console.log("Got these searches:", response);
        setLocalSearches(response.data);
      }).catch((err) => {
        console.log("Error loading previous searches:", err);
      });
    }, [localSearches] );
    

    function saveSearch(payload) {
      console.log("payload to save search: ", payload);
      API.saveSearch(payload)
        .then((response) => {
          // the response will be the items array - 
          // so we need to save our original payload, and the response

          console.log("Search info saved", response.data);
          dispatch({ type: SEARCH_SAVED, searchSaved: true });
          dispatch({ type: ADD_SEARCH_DETAIL, 
            newSearch: { 'image_url': payload.image_url, 'items': response.data} });
          
        })
        .catch((err) => {
          console.log("Saving of this search info was not successfull");
        })
        .finally(() => {
          console.log("Finally done saving the search, and updating the state.");
          history.push('/results');
        //  dispatch({ type: ADD_SEARCH_DETAIL, newSearch: payload.itemNames });
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
             
              
              if (res.data.items.length > 0) {
                // remove duplicate items...

                let uniqueItems = [];
                res.data.items.map((item,index) => {
                  if (uniqueItems.indexOf(item) == -1) {
                    uniqueItems.push(item);
                  }
                });
                let payload = { UserId: thisUserId, image_url: state.CurrentSearch.image_url,
                  itemNames: uniqueItems };

                saveSearch( payload );
              } else {
                console.log("Google Image AI wasn't able to extract any items.");
              }

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
              console.log('Search Data: ', existingSearches.data);
              // query the DB to get the items associated with this search
              let searchId = existingSearches.data[0].id;
              console.log('Search Id: ', searchId);
              API.getItems(searchId).then((items) => {
                console.log("Got these items: ", items);

                dispatch({ type: SEARCH_SAVED, searchSaved: true });
                dispatch({ type: ADD_SEARCH_DETAIL, 
                  newSearch: { 'image_url': existingSearches.data[0].image_url, 'items': items.data} });

              }).catch((err) =>{console.log(err);}).finally(()=>{
                history.push('/results');
              });

          }
     }).catch((err) => {
       console.log("Error searching for the search:", err);
     });


     
      // history.push('/analyze');
    }

    return (
      <div className='search'>
      <div className=''>
      <h1>Previous Searches:</h1>
      { localSearches ? (<div className='thumbs'>
      {localSearches.map((search,index) => (
        <div key={index} className='thumb'><img src={search.image_url}/></div>
      ))}
      </div>): (<div></div>)}
      </div>
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