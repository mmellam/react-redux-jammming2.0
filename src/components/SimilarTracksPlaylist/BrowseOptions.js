import React from 'react';

const BrowseOptions = () => {

    
    return (
        <div>
            <h3>2. Select your song preferences</h3>
            <div>
                <label htmlFor='acousticness'>Acousticness:</label>
                <input type='range' min='0' max='1' step='0.1' name='acousticness' id='acousticness' />
            </div>
            <div>
                <label htmlFor='energy'>Energy:</label>
                <input type='range' min='0' max='1' step='0.1' name='energy' id='energy' />
            </div>
            <div>
                <label htmlFor='danceability'>Danceability:</label>
                <input type='range' min='0' max='1' step='0.1' name='danceability' id='danceability' />
            </div>
            <div>
                <label htmlFor='speechiness'>Speechiness:</label>
                <input type='range' min='0' max='1' step='0.1' name='speechiness' id='speechiness' />
            </div>
            <div>
                <label htmlFor='instrumentalness'>Instrumentalness:</label>
                <input type='range' min='0' max='1' step='0.1' name='instrumentalness' id='instrumentalness' />
            </div>
        </div>
    );
}

export default BrowseOptions;