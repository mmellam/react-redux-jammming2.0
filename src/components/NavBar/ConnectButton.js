import React from 'react';
import { onClickGetAccessToken } from '../../util/spotify';

const ConnectButton = () => {
    return (
        <button onClick={onClickGetAccessToken} type='button'>Connect to your spotify account</button>
    );
}
//<img className="ButtonLogo" src={logo} alt="Spotify logo"/>


export default ConnectButton;