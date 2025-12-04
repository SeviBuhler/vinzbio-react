import React, { useState, useEffect, memo } from 'react';
import './contactPageStyles.css';
import Images from '../../images/imageImport.js';
import ContactForm from '../ContactForm/contactForm.js';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = memo(() => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        <section className='contact-page-section' aria-label="Kontaktbereich">
            <div className="contact-page">
                <img 
                    src={isMobile ? Images.WelleOrange2 : Images.WelleOrange} 
                    alt="Dekorative orange Welle im Hintergrund" 
                    className='background'
                    loading="lazy"
                />

                <div className='contact-page-content'>
                    <header className='contact-page-title'>
                    </header>

                    <ContactForm />

                    <address className='contactdates'>
                        <div className='address'>
                            <strong>Adresse:</strong>
                            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <span itemProp="name">Jan Weiss</span><br />
                                <span itemProp="streetAddress">Teufener Strasse 124</span><br />
                                <span itemProp="postalCode">9000</span> <span itemProp="addressLocality">St.Gallen</span>
                            </p>
                        </div>

                        <div className='phonenumber'>
                            <strong>Telefon:</strong>
                            <a 
                                href="tel:+41793661446"
                                className='phone-link'
                                aria-label="Rufen Sie uns an unter +41 79 366 14 46"
                                itemProp="telephone"
                            >
                                +41 79 366 14 46
                            </a>
                        </div>
                        
                        <div className='email'>
                            <strong>E-Mail:</strong>
                            <a 
                                href="mailto:jan@vinz.bio?subject=Anfrage%20von%20Vinz%20Website&body=Hallo%20Jan%0A%0A"
                                className='email-link'
                                aria-label="Senden Sie uns eine E-Mail an jan@vinz.bio"
                                itemProp="email"
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
                            aria-label="Besuchen Sie uns auf Instagram"
                        >
                            <FaInstagram className='sozial-icon' aria-hidden="true" />
                        </a>
                        <a 
                            href="https://www.linkedin.com/company/105987035" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Besuchen Sie uns auf LinkedIn"
                        >
                            <FaLinkedin className='sozial-icon' aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </section>
    );
});

ContactPage.displayName = 'ContactPage';

export default ContactPage;