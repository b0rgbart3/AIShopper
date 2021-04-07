import React, { createContext, useReducer, useContext } from "react";
import {
    LOGIN,
    LOGOUT, 
    CREATE_USER,
    GET_USER,
    SET_FRIENDS,  // when we first load the friends from the db
    ADD_FRIEND,   
    REMOVE_FRIEND,
    ENTER_URL,
    ADD_SEARCH_DETAIL,
    GET_PREVIOUS_SEARCHES,
    REMOVE_PREVIOUS_SEARCH,
    LOADING,
    STOP_LOADING,
    SET_STORE_PREF,
    SET_SEARCH_ITEM,
    SET_CURRENT_PATH,
    SEARCH_SAVED
} from "./actions";
// import { FLOAT, INTEGER } from "sequelize";

const ShopprContext = createContext(
{
    user: {
        id: "",
        name: "",
        email: "",
        avatar: ""
    },
    friends:[],  // array of friend (User) ids

    previousSearches: [{}],

    has_url: false,
    currentSearch: {
        image_url: "",
       // image_blob: "",
        items: [],
       // basedOnExistingSearch: false,
    },
    isOnline: true,
    current_search_item : 0,
    currentPath: "/",
    loading: false,
    searchSaved: false
}

);
const { Provider } = ShopprContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      
      console.log("Setting the new state to include this new user:", action.user);
      return { ...state, user: action.user, loading:false};
  case LOGOUT:
    console.log("In the logout method of the dispatcher.");
    return {...state, user: null };

  case CREATE_USER:
    return {
      ...state,
      user: action.user,
      loading: false
    };
  case GET_USER:
    return {
      ...state,
      loading: false
    };
  case ADD_FRIEND:
      let largerFriends =[ ...state.Friends, 
        action.newFriend];
        console.log('Inside global state add friend: ',largerFriends);
      return {
          ...state, 
          friends: largerFriends,
        loading:false
      }
  case REMOVE_FRIEND:
    let lessFriends = state.Friends.filter( friend => friend !== action.friendID ) 

    return {
        ...state, 
        friends: lessFriends,
        loading:false}
  case SET_FRIENDS:
    return {...state, Friends: action.friends}
  
  case ENTER_URL:
    console.log("In GS setting image_url to: ", action.url);
    return {...state, has_url: true, currentSearch: { image_url: action.url } }

  case ADD_SEARCH_DETAIL:

      // Here we are performing a new search - so lets go ahead and also
      // set the Friend's searches info for comparison
      console.log("In the Global state, setting searchDetails to: ", action.newSearch);
      
      return {...state, currentSearch: action.newSearch, loading:false}
  
  case GET_PREVIOUS_SEARCHES:
    return {
        ...state, 
        previousSearches: action.previousSearches,
        loading:false
    }
  case REMOVE_PREVIOUS_SEARCH:
    let newpreviousSearches = state.previousSearches.filter( 
        search => search !== action.searchID )
      return {
          ...state,
          previousSearches: newpreviousSearches, loading:false
      }
  case LOADING:
    console.log(state.loading);
    return {
      ...state,
      loading: true
    };

  case STOP_LOADING:
    return {
      ...state,
      loading: false
    };

  case SET_STORE_PREF:
    return {
      ...state,
      isOnline : action.isOnline
    }

  case SET_SEARCH_ITEM:
    console.log("In Global State, setting current_search_item to: " + action.current_search_item);
    return {
      ...state, current_search_item: action.current_search_item
    }
  case SET_CURRENT_PATH:
    return {
      ...state, has_url: false, currentSearch: { image_url: null }, currentPath: action.currentPath
    }
  case SEARCH_SAVED:
    console.log("In the Global state, setting searchSaved to: ", action.searchSaved);
    return {
      ...state, searchSaved: action.searchSaved, loading: false
    }

  default:
    return state;
  }
};

const ShopprProvider = ({ value = [], ...props }) => {
  
  const [state, dispatch] = useReducer(reducer,
     {
      User: null,
    Friends:[],  // array of friend (User) ids

    previousSearches: [{}],

    currentSearch: {
        image_url: "",
        image_blob: "",
        items: [

      ]
    },
    isOnline: true,
    current_search_item : 0,
    currentPath: "/",
    loading: false,
    searchSaved: false
     });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useShopprContext = () => {
  return useContext(ShopprContext);
};

export { ShopprProvider, useShopprContext };
