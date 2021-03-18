import React from 'react';
import '../App.css';
import './Burger.css';

const Burger = (props) => {


    return (

    <div className='burger' onClick={props.handler}>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
    </div>

);
    }
export default Burger;