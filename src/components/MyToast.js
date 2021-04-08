import React, { useEffect, useState } from 'react';
import "./MyToast.scss";
import { useShopprContext } from "../utils/GlobalState";
import { CLEAR_TOAST } from "../utils/actions";
function MyToast(){
    const [state, dispatch ] = useShopprContext();
    const [toastStyle, setToastStyle ] = useState("");

    let currentToast;
    //console.log("In MyToast, toasts: ", state.toast);

    useEffect(() => {
        let timer;
        if (state.toast && state.toast.length > 0) {
            currentToast = state.toast[0];
            if (currentToast) {
                timer = setTimeout(()=> {
                    setToastStyle("toastStyle2");
                   
                }, 200);
            }
        }
        return() => {clearTimeout(timer);}
    });

    useEffect(() => {
        let timer;
        if (state.toast && state.toast.length > 0) {
            console.log("In my toast, toast length: ", state.toast.length);
            currentToast = state.toast[0];
            if (currentToast) {
              console.log("Current Toast: ", currentToast.message);
               timer = setTimeout(()=> {
                console.log('clearing the toast.');
                dispatch({type:CLEAR_TOAST});
               
            }, 3000);
          }
        }
        return() => {clearTimeout(timer);setToastStyle("");}
    }, [state.toast]);

    return (
        <>
        {(state.toast && state.toast.length > 0) ? (
            <div className={`toastContainer`}>
            <div className={`toast ${toastStyle}`}>
            <h1>My Toast</h1>
           <p>{state.toast[0].message}</p> 
        </div></div>
        ) : (
            <div></div>
        )}
            </>

    );
}

export default MyToast;