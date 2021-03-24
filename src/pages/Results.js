import React from 'react';
import { useShopprContext } from "../utils/GlobalState";
import './Results.scss';

function Results(){
    const [state, dispatch ] = useShopprContext();

    return (
        <div className='results'>
        <div className='resultImage'>
        <img src={state.CurrentSearch.image_url} />
        </div>
        <ul>
            {state.CurrentSearch.items.map((item,index)=>(
                <li key={index}>{item.name}</li>
            ))}
        </ul>
        </div>
    );
}

export default Results;