import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../features/playlistCreator/playlistCreatorSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const onClickSearch = () => { 
        // todo: check if token has been obtained
        if (!searchTerm || searchTerm[0] === ' ') {
            return;
        }
        dispatch(search(searchTerm));
    }

    const handleEnter = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            onClickSearch();
          }
    }

    return (
        <div className='search-bar'>
            <input placeholder='Enter A Song, Album, or Artist' onChange={onChangeHandler}
                onKeyDown={handleEnter} autoFocus/>
            <button className='search-button' onClick={onClickSearch} type='button'>SEARCH</button>
        </div>
    );
}

export default SearchBar;