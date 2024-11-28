import React, { useState, useEffect, useRef } from 'react';
import './TitleCard.css';
import LazyLoad from 'react-lazyload';

const TitleCard = ({ title, category, onClick = () => {} }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGY3NGYzYWY5MWIyOGJiNmMwNmY3ZDllODllZDFiNiIsIm5iZiI6MTczMjc4NjMxMy40NDM4ODQ2LCJzdWIiOiI2NWIxMDQ2M2EzMTQ0MDAxOTM1YWNjNzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ksL5zBvPfZTRuqDhuvsYe8XA4t6sPiX3XFS2_LW1N0s',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();

    // Add event listener for scroll
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    // Cleanup listener on component unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() =>
                onClick(
                  card.original_title,
                  card.original_title,
                  `https://image.tmdb.org/t/p/w500${card.backdrop_path}`,
                  card.overview,
                  []
                )
              }
            >
              <LazyLoad height={200} offset={100}>
                <img
                  src={
                    card.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                      : 'fallback-image-url.png'
                  }
                  alt={card.original_title || 'Movie'}
                  className="card-image"
                  onError={(e) => (e.target.src = 'fallback-image-url.png')} // Fallback image
                />
              </LazyLoad>
              <p>{card.original_title || 'Untitled'}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TitleCard;
