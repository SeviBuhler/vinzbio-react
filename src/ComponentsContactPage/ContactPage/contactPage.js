import React from 'react';
import './contactPageStyles.css';
import Images from '../../images/imageImport.js';
import ContactForm from '../ContactForm/contactForm.js';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiInstagram, SiLinkedin } from 'react-icons/si';



const ContactPage = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 719);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className='contact-page-section'>
           
            <div className="contact-page">
                    { isMobile ? (
                        <img src={Images.WelleOrange2} alt="Background Waves" className='background' />
                    ) : (
                        <img src={Images.WelleOrange} alt="Background Waves" className='background' />
                    )}

                <div className='contact-page-content'>
                    <div className='contact-page-title'>
                        <h2>Kontakt</h2>
                    </div>
                    <ContactForm/>
                    <div className='contactdates'>

                        <div className='address'>
                            <label>Adresse:</label>
                            <p>
                                Jan Weiss<br />
                                Teufener Strasse 124<br />
                                9000 St.Gallen
                            </p>
                        </div>

                        <div className='phonenumber'>
                            <label>Telefon:</label>
                            <a 
                                href="tel:+4915123456789"
                                className='phone-link'
                            >
                                +41 79 366 14 46
                            </a>
                        </div>
                        
                        <div className='email'>
                            <label>E-mail:</label>
                            <a 
                                href="mailto:jan@vinzbio?subject=Anfrage%20von%20Vinz%20Website&body=Hallo%20Jan%0A%0A"
                                className='email-link'
                            >
                                jan@vinz.bio
                            </a>
                        </div>
   
                    </div>
                    <div className='link-icons'>
                        <a href="https://www.instagram.com/vinz.bio" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='sozial-icon' color="#E4405F" />
                        </a>
                        <a href="https://www.linkedin.com/company/105987035" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='sozial-icon' color="#0077B5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage;