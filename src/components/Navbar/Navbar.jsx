// Navbar.jsx
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import search from '../../assets/search_icon.svg';
import bell from '../../assets/bell_icon.svg';
import profile from '../../assets/profile_img.png';
import caret from '../../assets/caret_icon.svg';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Mengubah state ketika scroll lebih dari 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className='navbar-left'>
        <img src={logo} alt="Icon" className=''/>
        <ul className=' '>
          <li className=''>Home</li>
          <li className=''>Series</li>
          <li className=''>Movie</li>
          <li className=''>New & Populer</li>
          <li className=''>My List</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search} alt="Search" className='icons'/>
        <p>Adult</p>
        <div>
          <img src={bell} alt="Bell" className='icons'/>
        </div>
        <div className='navbar-profile'>
          <img src={profile} alt="" className='profile'/>
          <img src={caret} alt="" />
          <div className='dropdown'>
            <p className=''>I Love You</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
