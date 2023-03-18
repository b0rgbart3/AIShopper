import React, { useEffect, useState } from "react";
import "./MyToast.scss";
import { useShopprContext } from "../utils/GlobalState";
import { CLEAR_TOAST } from "../utils/actions";
function MyToast() {
  const [state, dispatch] = useShopprContext();
  const [toastStyle, setToastStyle] = useState("");

  const currentToast = useEffect(() => {
    if (state && state.toast) {
      console.log("In mytoast, state has toast:", state?.toast[0]);
      return state?.toast[0];
    } else {
      return null;
    }
  }, [state, state.toast]);

  useEffect(() => {
    let timer;
    if (state.toast && state.toast.length > 0) {
      if (currentToast) {
        timer = setTimeout(() => {
          setToastStyle("toastStyle2");
        }, 200);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentToast, state.toast]);

  useEffect(() => {
    let timer;
    if (state.toast && state.toast.length > 0) {
      console.log("In my toast, toast length: ", state.toast.length);
      console.log('current toast: ', state.toast[0]);
      if (state.toast[0]) {
        console.log("Current Toast: ", state.toast[0].message);
        timer = setTimeout(() => {
          console.log("clearing the toast.");
          dispatch({ type: CLEAR_TOAST });
        }, 3000);
      }
    }
    return () => {
      clearTimeout(timer);
      setToastStyle("");
    };
  }, [currentToast, dispatch, state.toast]);

  return (
    <>
      {
        <div className={`toastContainer`}>
          <div className={`toast ${toastStyle}`}>
            <h1>My Toast</h1>
            <p>{state && state.toast ? (state?.toast[0]?.message) : ''}</p>
          </div>
        </div>
      }
    </>
  );
}

export default MyToast;
