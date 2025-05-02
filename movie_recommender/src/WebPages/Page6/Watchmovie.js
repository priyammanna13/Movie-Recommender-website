import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import style from "../Styles/Watchmovie.module.css";


const MovieWatch = ({ movieTitle }) => {
  const [movieId, setMovieId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_KEY = '1131ab6f7e96fcc1c729699cbf8b22cc';

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setMovieId(data.results[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie ID:', error);
        setLoading(false);
      }
    };

    if (movieTitle) {
      fetchMovieId();
    }
  }, [movieTitle]);

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  if (loading) {
    return (
      <div className={style.spinnerWrapper}>
        <div className={style.spinner}></div>
      </div>
    );
  }
  
  return (
    <div className={style.container}>
      <div className={style.centerButton}>
        <button
          onClick={togglePlayer}
          className={style.watchButton}
          disabled={!movieId}
        >
          {movieId ? 'Watch Movie' : 'Movie Not Found'}
        </button>
      </div>
  
      {showPlayer && movieId && (
        <div className={style.modalOverlay}>
          <div className={style.videoWrapper}>
            <button
              onClick={togglePlayer}
              className={style.closeButton}
            >
              <X size={30} />
            </button>
            <iframe
              src={`https://vidsrc.xyz/embed/movie?tmdb=${movieId}`}
              width="100%"
              height="80%"
              allowFullScreen
              title="Movie Stream"
              className="border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default MovieWatch;
