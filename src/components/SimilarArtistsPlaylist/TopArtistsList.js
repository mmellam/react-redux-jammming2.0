import React from 'react';
import Artist from './Artist';

const TopArtistsList = (props) => {
    return (
        <div>
        {
            props.artists.map(artist => {
                return <Artist artist={artist} 
                    key={artist.id} />
            })
        }
        </div>

    );
}

export default TopArtistsList;