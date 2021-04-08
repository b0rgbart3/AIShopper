import React, { useEffect } from 'react';
import "./MyToast.scss";
import { useShopprContext } from "../utils/GlobalState";
import { CLEAR_TOAST } from "../utils/actions";
function MyToast(){
    const [state, dispatch ] = useShopprContext();
    

    let currentToast;
    //console.log("In MyToast, toasts: ", state.toast);

    useEffect(() => {
        let timer;
        if (state.toast && state.toast.length > 0) {
            console.log("In my toast, toast length: ", state.toast.length);
            currentToast = state.toast[0];
            if (currentToast) {
           // console.log("Current Toast: ", currentToast.message);
               timer = setTimeout(()=> {
                console.log('clearing the toast.');
                dispatch({type:CLEAR_TOAST});
               
            }, 3000);
          }
        }
        return() => clearTimeout(timer);
    });

    return (
        <>
        {(state.toast && state.toast.length > 0) ? (
            <div className='toast'>
            <h1>My Toast</h1>
           <p>{state.toast[0].message}</p> 
        </div>
        ) : (
            <div></div>
        )}
            </>

    );
}

export default MyToast;