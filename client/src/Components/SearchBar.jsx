import React from 'react';
import Search from './Search';
import Filter from './Filter';
import Order from './Order';
import Style from '../Styles/SearchBar.module.css';


function SearchBar(){
    return(
        <div className={Style.container}>
            <Search />
            <Filter />
            <Order />
        </div>
    )
}

export default SearchBar;