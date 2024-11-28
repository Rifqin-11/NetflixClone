import React from 'react';
import './Modal.css';
import LazyLoad from 'react-lazyload';

const Modal = ({ title, content, image, isOpen, onClose, description, modalImages }) => {
  if (!isOpen) return null;

  return (
      <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-body">
                  <div
                      className="modal-header-image"
                      style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #171717 100%), url(${image})`
                      }}
                  ></div>
                  <div className='modalText'>
                    <h2 className='modal-head'>{title}</h2>
                    <p className='description'>{description}</p>

                    {/* Display modal images here */}
                    <div className="image-gallery">
                        {modalImages && modalImages.map((modalImage, index) => (
                            <img key={index} src={modalImage} alt={`Modal image ${index + 1}`} className="gallery-image" loading="lazy"/>
                        ))}
                    </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Modal;
