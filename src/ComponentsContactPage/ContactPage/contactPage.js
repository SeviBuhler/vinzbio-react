import React, { useState, useEffect } from 'react';
import './contactPageStyles.css';
import Images from '../../images/imageImport.js';
import ContactForm from '../ContactForm/contactForm.js';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 719);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='contact-page-section' aria-labelledby="contact-title">
      <div className="contact-page">
        <img 
          src={isMobile ? Images.WelleOrange2 : Images.WelleOrange} 
          alt="" 
          className='background'
          role="presentation"
          aria-hidden="true"
          loading="lazy"
        />

        <div className='contact-page-content'>
          <header className='contact-page-title'>
            <h1 id="contact-title">Kontakt</h1>
          </header>

          <ContactForm />

          <address className='contactdates'>
            <div className='address-block'>
              <h2 className='contact-label'>Adresse:</h2>
              <p>
                Jan Weiss<br />
                Teufener Strasse 124<br />
                9000 St.Gallen
              </p>
            </div>

            <div className='phonenumber-block'>
              <h2 className='contact-label'>Telefon:</h2>
              <a 
                href="tel:+41793661446"
                className='phone-link'
                aria-label="Telefonnummer: +41 79 366 14 46"
              >
                +41 79 366 14 46
              </a>
            </div>
            
            <div className='email-block'>
              <h2 className='contact-label'>E-Mail:</h2>
              <a 
                href="mailto:jan@vinz.bio?subject=Anfrage%20von%20Vinz%20Website&body=Hallo%20Jan%0A%0A"
                className='email-link'
                aria-label="E-Mail an jan@vinz.bio"
              >
                jan@vinz.bio
              </a>
            </div>
          </address>

          <nav className='link-icons' aria-label="Social Media Links">
            <a 
              href="https://www.instagram.com/vinz.bio" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Besuche uns auf Instagram"
            >
              <FaInstagram className='sozial-icon' aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/company/105987035" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Besuche uns auf LinkedIn"
            >
              <FaLinkedin className='sozial-icon' aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;