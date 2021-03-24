import React from 'react';
import { useShopprContext } from "../utils/GlobalState";

function Results(){
    const [state, dispatch ] = useShopprContext();

    return (
        <>
        <img src={state.CurrentSearch.image_url}></img>
        <ul>
            {state.CurrentSearch.items.map((item,index)=>(
                <li key={index}>{item.name}</li>
            ))}
        </ul>
        </>
    );
}

export default Results;