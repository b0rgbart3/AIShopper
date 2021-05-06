import React, { useState } from 'react';
import { useShopprContext } from "../utils/GlobalState";
import './Results.scss';
import { LOADING, STOP_LOADING } from "../utils/actions";
import API from "../utils/API";
import pluralize from 'pluralize';

function Results(){
    const [state, dispatch ] = useShopprContext();
    const [products, setProducts ] = useState([]);
    const [item, setItem] = useState('');

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
    function choose(itemName) {
        setItem(itemName.name);
        console.log('Item chosen: ', itemName.name);

        dispatch({ type: LOADING });
        API.getProducts(itemName.name)
        .then((results) => {
          //setItemList(results.data);
          console.log("In Results choose method, PRODUCT RESULTS: ", results.data);
          console.log("type of", typeof(results.data));
          console.log("# of products: ", results.data[0]);
          let clippedTitles = results.data.map((product) => {
            let productData;
            if (product.price) {
               productData = {image: product.image, title: clipThis(product.title), price: product.price };
            } else {
                productData = {image: product.image, title: clipThis(product.title) }
            }
              return productData;
          })
          setProducts(clippedTitles);
          dispatch({ type: STOP_LOADING });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: STOP_LOADING });
        });

    }
    console.log(products);
    return (
        <>
        <div className='results'>
            <div className='resultImage'>
            <img src={state.currentSearch.image_url} alt='current_search'/>
            </div>
            <div className='resultData'>
                <h1>Google Vision AI found:</h1>
                <ul>
                    {state.currentSearch.items.map((itemName,index)=>(
                        <li key={index} onClick={()=> { choose(itemName); }}>{itemName.name}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className='products'>
        { item!=='' ? ( <h1>{pluralize(item) } found on Amazon:</h1>) :(<></>) }
       
            {products ? (<div className='productChart'>

                {products.map((product, index) => (
                    <div className='product' key={index}>
                        <div className='productImage'>
                            <img src={product.image} alt={`${product.title.substring(0,60)}`} />
                        </div>
                    <h1>{product.title.substring(0,60)}</h1>
                 {product.price ? (<p className='price'>{product.price.raw}</p>) : (<p className='price'>price not listed</p>)}
                    
                  
                    </div>
                ))}

            </div>) : (<div>no products</div>) }
        </div>
        </>
    );
}

export default Results;