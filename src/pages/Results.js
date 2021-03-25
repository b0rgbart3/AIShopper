import React, { useState } from 'react';
import { useShopprContext } from "../utils/GlobalState";
import './Results.scss';
import { LOADING, STOP_LOADING } from "../utils/actions";
import API from "../utils/API";

function Results(){
    const [state, dispatch ] = useShopprContext();
    const [products, setProducts ] = useState([]);

    function clipThis(title) {
        console.log('about to clip: ', title);
        let titleArr = title.split(' ');
        console.log(titleArr);
        let lastWord = titleArr.length;
        titleArr.splice(8,lastWord);
        console.log('clipped version:', titleArr);
       
        let clippedVersion = titleArr.join(' ');
        return clippedVersion;
    }
    function choose(item) {
        console.log('Item chosen: ', item.name);

        dispatch({ type: LOADING });
        API.getProducts(item.name)
        .then((results) => {
          //setItemList(results.data);
          console.log("PRODUCT RESULTS: ", results);
          let clippedTitles = results.data.map((product) => {
              return {image: product.image, title: clipThis(product.title) }
          })
          setProducts(clippedTitles);
          dispatch({ type: STOP_LOADING });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: STOP_LOADING });
        });

    }

    return (
        <>
        <div className='results'>
            <div className='resultImage'>
            <img src={state.CurrentSearch.image_url} />
            </div>
            <div className='resultData'>
                <h1>Google Vision AI found these items:</h1>
                <ul>
                    {state.CurrentSearch.items.map((item,index)=>(
                        <li key={index} onClick={()=> { choose(item); }}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className='products'>
            {products ? (<div className='productChart'>

                {products.map((product, index) => (
                    <div className='product' key={index}>
                        <div className='productImage'>
                            <img src={product.image} />
                        </div>
                    <h1>{product.title.substring(0,60)}</h1>
                  
                    </div>
                ))}

            </div>) : (<div>no products</div>) }
        </div>
        </>
    );
}

export default Results;