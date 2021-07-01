import React from 'react';

const Artist = (props) => {

    
    return (
        <div>
            <h3>{props.artist.name}</h3>
            <p>{props.artist.genre}</p>
            <img src={props.artist.image.url} alt='Artist'/>
            <label htmlFor={props.artist.id}></label>
            <input type='checkbox' id={props.artist.id} name={props.artist.name} value={props.artist.id}/>

        </div>

    );
}

export default Artist;