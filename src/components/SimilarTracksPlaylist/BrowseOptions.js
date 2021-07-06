import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOption, selectBrowseOptions } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';

const BrowseOptions = () => {
    const dispatch = useDispatch();
    const browseOptions = useSelector(selectBrowseOptions);

    const handleSliderChange = (e) => {
        const option = {
            name: e.target.name,
            value: e.target.value
        };
        dispatch(addOption(option));
    };

    return (
        <div className='browse-options'>
            <h3>Select your song preferences</h3>
            <div className='slider'>
                <label htmlFor='target_energy'>Energy:</label>
                <input type='range' onChange={handleSliderChange} min='0' max='1' step='0.1' 
                    name='target_energy' id='target_energy' value={browseOptions[0].value} />
            </div>
            <div className='slider'>
                <label htmlFor='target_danceability'>Danceability:</label>
                <input type='range' onChange={handleSliderChange} min='0' max='1' step='0.1' 
                    name='target_danceability' id='target_danceability' value={browseOptions[1].value} />
            </div>
            <div className='slider'>
                <label htmlFor='target_speechiness'>Speechiness:</label>
                <input type='range' onChange={handleSliderChange} min='0' max='1' step='0.1' 
                    name='target_speechiness' id='target_speechiness' value={browseOptions[2].value} />
            </div>
            <div className='slider'>
                <label htmlFor='target_acousticness'>Acousticness:</label>
                <input type='range' onChange={handleSliderChange} min='0' max='1' step='0.1' 
                    name='target_acousticness' id='target_acousticness' value={browseOptions[3].value} />
            </div>
            <div className='slider'>
                <label htmlFor='target_instrumentalness'>Instrumentalness:</label>
                <input type='range' onChange={handleSliderChange} min='0' max='1' step='0.1' 
                    name='target_instrumentalness' id='target_instrumentalness' value={browseOptions[4].value} />
            </div>
        </div>
    );
}

export default BrowseOptions;