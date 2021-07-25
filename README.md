# Jammming 2.0.0

A playlist creator app to save multiple songs to a Spotify playlist, get recommendations based on user selected tracks and artists, and search for similar songs with user preferred characteristics such as energy, danceability, or acousticness.

## Technologies 
React, Redux, Redux Toolkit

## Usage

Run npm install inside the root folder to install on your local machine.

Note: This app requires a Spotify account. Upon connecting, the app needs authorization to read your top artists and tracks and to create a playlist to your account. The app works as client side only and your Spotify data is not stored on any server.

## API information

The Spotify Web API returns JSON.

Endpoints used:

- accounts.spotify.com/authorize
- api.spotify.com/v1/search
- api.spotify.com/v1/me
- api.spotify.com/v1/users
- api.spotify.com/v1/playlists
- api.spotify.com/v1/me/top/artists
- api.spotify.com/v1/me/top/tracks
- api.spotify.com/v1/recommendations

Required scopes: playlist-modify-public, user-top-read

## Inspiration
This project is based on an exercise in the Front-End Engineering course from codecademy.com. I used React-Redux, RKT and React Router instead of pure React and expanded on the functionality by getting users' top tracks and artists and providing the option to select up to 5 of them to get specific recommendations. Further I included a feature that lets users choose their preferred song characteristics for specific search and browsing. A new UI was implemented, too.

## UI Visuals
![image](https://drive.google.com/uc?export=view&id=13slpulFu3DtsvkN836jbtbi-MNeqPh8K)

![image](https://drive.google.com/uc?export=view&id=1EwQxwMASupWvHYtbDRJjUFFBhDMxtaBd)

![image](https://drive.google.com/uc?export=view&id=1VA7HAFVe3m5qo53LMP0Qifc5YnhO3O3n)

