import React from 'react'
import './Footer.css'
import yticon from "../../assets/youtube_icon.png"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={yticon} alt="" />
      </div>
    </div>
  )
}

export default Footer