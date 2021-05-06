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


    useEffect(() => {
            API.getSearches()
            .then( response => {
              const data = response.data;
              console.log("data:", data);

              // Sometimes urls of images on the web change so
              // we don't want to display dead images, so let's
              // check to see if these images actually load...
              // and only keep the images that actually load
              
              let goodData = [];
              data.forEach( (image) => {
                let imgObject = new Image(100,100);
                imgObject.src = image.image_url;
                imgObject.onload = ()=> {
                  goodData.push(image);
                  console.log('image finished loading....', goodData);
                  setLocalSearches([...goodData]);
                }
              })
            }).catch( err=> {
              console.log("In catch block, with err: ", err);
            })
    }, []);  // empty array makes it so that this effect only runs once - when the component mounts.

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
        console.log("About to validate: ", urlString);
        let tempUrlString = urlString.trim();
        console.log("tempUrlString: ", tempUrlString);
        let regex = /(http(s?):)*\.(?:jpg|png)/;
        if (tempUrlString.match(regex)) {
            setLocalUrl(tempUrlString);
            console.log("Local url: ", tempUrlString);
            dispatch({ type: ENTER_URL, url: tempUrlString });
            console.log("Local url: ", tempUrlString);
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
    function analyze( url ) {
//state.CurrentSearch.image_url

      API.checkIfUrlWasAlreadyAnalyzed( url ).then(
        (existingSearches) => {
          console.log("Back from the API, length:");
         // setExistingSearch(existingSearches);
          console.log(existingSearches.data.length);
          if (existingSearches.data.length <= 0 ) {
              console.log('didnt find this as a previous search');
              // Didn't find a previous search, so we need to send it to 
              // the GoogleAPI

              API.extractUrl(state.currentSearch.image_url)
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
                res.data.items.forEach((item,index) => {
                  if (uniqueItems.indexOf(item) === -1) {
                    uniqueItems.push(item);
                  }
                });
                let payload = { UserId: thisUserId, image_url: state.currentSearch.image_url,
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

    function selectSearch(search) {
      console.log("User has chosen: ", search);
      analyze(search.image_url);
      // dispatch({ type: ADD_SEARCH_DETAIL, 
      //   newSearch: { 'image_url': search.image_url, 'items': search.items} });
      //  history.push('/results');
    }




    

    return (
      <div className='search'>
      <div className=''>
      {localSearches.map((search)=>(<p key={search.image_url}>{search.image_url}</p>))}

      { localSearches.length>0 ? (      <div><h1>previous searches:</h1><div className='thumbs'>
      {localSearches.map((search,index) => (
        <div key={index} className='thumb'>
        <img src={search.image_url} alt={search.title} onClick={()=>{selectSearch(search)}} />
        </div>
      ))}</div>
      </div>): (<div><p>No previous search images were found.</p></div>)}
      </div>
      <hr />
        <h1>enter a new image url:</h1>
        <form onSubmit={(e)=>validateUrl(e,url.current.value)}>
            <input ref={url} type="text"/>
            <input type='submit' value='enter' />
        </form> 

{ state.has_url ? (
        <div className='analyze'>
          <div className='analyzeImage'>
          <img src={state.currentSearch.image_url} alt='about_to_analyze'/>
          </div>
          <button className='pill-style' onClick={()=>{analyze(state.currentSearch.image_url);}}>Analyze this image</button>
      
        </div> ) : ( <div></div> ) }
      </div>     
    );
}

export default Search;