import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../assets/hero_banner2.jpg';
import './Home.css';
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import TitleCard from '../../components/TitleCard/TitleCard';
import Modal from '../../components/Modal/Modal';
import Player from '../Player/Player';
import TitleCard2 from '../../components/TitleCard/TitleCard2';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    image: '',
    description: '',
    modalImages: '',
  });


  const openModal = (name, content, image, description, modalImages) => {
    setModalContent({ title: name, content, image, description, modalImages });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const playVideo = () => {
    setPlayerOpen(true);
  };

  const closePlayer = () => {
    setPlayerOpen(false);
  };

  // Data kategori untuk ditampilkan
  const categories = [
    { title: 'Now Playing', category: 'now_playing' },
    { title: 'Top Rated', category: 'top_rated' },
    { title: 'Popular', category: 'popular' },
    { title: 'Upcoming', category: 'upcoming' },
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={HeroBanner} alt="Hero Banner" className="banner-img" />
        <div className="hero-caption">
          <h1>Money Heist</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo officiis corrupti atque necessitatibus eius dolores cumque nemo aspernatur deserunt sunt inventore, possimus quis maiores expedita ipsum iure quod? Optio, odio.
          </p>
          <div className="hero-btns">
            <button className="btn" onClick={playVideo}>
              <img src={play} alt="" /> Play
            </button>
            <button className="btn dark-btn" onClick={() => openModal('Information')}>
              <img src={info} alt="" /> Information
            </button>
          </div>
          <TitleCard2 openModal={openModal} />
        </div>
      </div>

      {isPlayerOpen && (
        <div className="player-overlay">
          <Player videoId="ZZDMP7Te8bY" />
          <button className="close-btn" onClick={closePlayer}>
            Close
          </button>
        </div>
      )}

      <div className="more-cards">
        {categories.map((item, index) => (
          <TitleCard
            key={index}
            title={item.title}
            category={item.category}
            onClick={openModal}
          />
        ))}
      </div>

      <Modal
        title={modalContent.title}
        content={modalContent.content}
        description={modalContent.description}
        image={modalContent.image}
        modalImages={modalContent.modalImages}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
