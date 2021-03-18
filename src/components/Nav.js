import React from 'react';
import '../App.css';
import './Nav.css';
import Burger from './Burger';

const Nav = () => (
    <header>
       <div className='logotype'>
        ImageShoppr
        <span className='registered'>&reg;</span>
       </div> 
       <div className='desktopMenu'></div>
       <Burger />
    </header>
)

export default Nav;