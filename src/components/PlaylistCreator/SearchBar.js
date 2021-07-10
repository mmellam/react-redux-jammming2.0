import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../features/playlistCreator/playlistCreatorSlice';
import icon from './magnifiying-glass.png';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const onClickSearch = () => { 
        if (!searchTerm || searchTerm[0] === ' ') {
            return;
        };
        dispatch(search(searchTerm));
    };

    const handleEnter = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            onClickSearch();
          };
    };

    return (
        <div className='search-bar'>
            <input placeholder='Song, album or artist' 
                onChange={onChangeHandler}
                onKeyDown={handleEnter} 
                autoFocus
                />
            <button className='search-button' onClick={onClickSearch} type='button'><img src={icon} alt='search'/></button>
        </div>
    );
}

export default SearchBar;