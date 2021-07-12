import React, { useEffect, useState } from 'react';

const SavedMessage = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, 3000);
        return () => {
            clearTimeout(timeId);
        }
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className='saved-message'>
            <p>Playlist saved successfully!</p>
        </div>
    );
}

export default SavedMessage;