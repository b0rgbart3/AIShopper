import React, {useState} from 'react';
import SearchComponent from "../components/SearchComponent";
import AnalyzeImageComponent from "../components/AnalyzeImageComponent";

function Search(){
    const [url,setUrl] = useState('');

    // when the user enters a url, this function will validate it
    function validateUrl(urlString) {
        let tempUrlString = urlString.trim();
        let regex = /(http(s?):)*\.(?:jpg|png)/;
        if (tempUrlString.match(regex)) {
            setUrl(tempUrlString);
        } else {
            setUrl('');
        }
    }

    // If there is no valid url yet, we display the search field,
    // otherwise we display the image itself, and a button to start the analysis

    return (
      <div className='search'>
    
           { url === '' ?
           <SearchComponent validateUrl={validateUrl}/>  :
           <AnalyzeImageComponent url={url}/>
           }
      </div>     
    );
}

export default Search;