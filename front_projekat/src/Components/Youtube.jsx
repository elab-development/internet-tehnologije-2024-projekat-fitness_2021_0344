import React, { useState } from 'react';
import axios from 'axios';
import './Youtube.css';
import Navigation from './Navigation';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const VIDEOS_PER_PAGE = 6;
const channels = [
  { id: process.env.REACT_APP_YOUTUBE_API_1_ID, name: 'JDCav24' },
  { id: process.env.REACT_APP_YOUTUBE_API_2_ID, name: 'FitnessBlender' },
  { id: process.env.REACT_APP_YOUTUBE_API_3_ID, name: 'popsugartvfit' },
  { id: process.env.REACT_APP_YOUTUBE_API_4_ID, name: 'MadFit' },
  { id: process.env.REACT_APP_YOUTUBE_API_5_ID, name: 'ChloeTing' },
  { id: process.env.REACT_APP_YOUTUBE_API_6_ID, name: 'befit' },

];

const YouTube = () => {
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prevPageTokens, setPrevPageTokens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  const fetchUploadsPlaylistId = async (channelId) => {
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'contentDetails',
          id: channelId,
          key: API_KEY,
        },
      });
      const uploadsId = res.data.items[0].contentDetails.relatedPlaylists.uploads;
      setPlaylistId(uploadsId);
      return uploadsId;
    } catch (err) {
      console.error('Greška pri dohvatanju uploads playlist ID:', err);
      return null;
    }
  };


  const fetchVideosFromPlaylist = async (plId, pageToken = '', isNext = false) => {
    setLoading(true);
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId: plId,
          maxResults: VIDEOS_PER_PAGE,
          pageToken,
          key: API_KEY,
        },
      });
      setVideos(res.data.items);
      setNextPageToken(res.data.nextPageToken || '');

     
      if (isNext && pageToken) {
        setPrevPageTokens((prev) => [...prev, pageToken]);
      } else if (!isNext && prevPageTokens.length > 0) {
        setPrevPageTokens((prev) => prev.slice(0, -1));
      }
    } catch (err) {
      console.error('Greška pri dohvatanju videa iz playlist:', err);
    }
    setLoading(false);
  };


  const handleChannelClick = async (channelId) => {
    setSelectedChannelId(channelId);
    setVideos([]);
    setPrevPageTokens([]);
    setNextPageToken('');
    setCurrentPage(1);

    const uploads = await fetchUploadsPlaylistId(channelId);
    if (uploads) {
      fetchVideosFromPlaylist(uploads);
    }
  };


  const handleNextPage = () => {
    if (nextPageToken && playlistId) {
      fetchVideosFromPlaylist(playlistId, nextPageToken, true);
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPageTokens.length > 0 && playlistId) {
      const previousToken = prevPageTokens[prevPageTokens.length - 1];
      fetchVideosFromPlaylist(playlistId, previousToken, false);
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <>
      <Navigation />
      <div className="youtube-page">
        <h1>YouTube Kanali</h1>

        <div className="video-results" style={{ marginBottom: '2rem' }}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="video-card"
              onClick={() => handleChannelClick(channel.id)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div
                className="video-thumbnail"
                style={{
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ddd',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {channel.name}
              </div>
            </div>
          ))}
        </div>


        {selectedChannelId && (
          <>
            <div className="video-results">
              {loading
                ? [1, 2, 3].map((i) => (
                    <div key={i} className="placeholder-card">
                      <div className="placeholder-thumbnail"></div>
                      <div className="placeholder-title"></div>
                      <div className="placeholder-description"></div>
                    </div>
                  ))
                : videos.map((video) => (
                    <div key={video.id} className="video-card">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="video-thumbnail"
                        />
                        <h3 className="video-title">{video.snippet.title}</h3>
                      </a>
                    </div>
                  ))}
            </div>

      
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <button
                onClick={handlePrevPage}
                disabled={prevPageTokens.length === 0}
                className="searchbar-button"
              >
                Prethodna
              </button>
              <span style={{ fontWeight: 'bold' }}>Strana {currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={!nextPageToken}
                className="searchbar-button"
              >
                Sledeća
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default YouTube;
