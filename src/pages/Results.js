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
            <div className='resultData'>
                <h1>Google Vision AI found these items:</h1>
                <ul>
                    {state.CurrentSearch.items.map((item,index)=>(
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Results;