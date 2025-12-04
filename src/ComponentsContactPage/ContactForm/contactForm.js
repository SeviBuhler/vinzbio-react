import React, { useState, useEffect, useCallback, memo } from 'react';
import './contactFormStyles.css';
import Swal from 'sweetalert2';

const WEB3FORMS_API = "https://api.web3forms.com/submit";

const ContactForm = memo(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const updateViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            updateViewportHeight();
        };

        updateViewportHeight();

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', updateViewportHeight);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateViewportHeight);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', updateViewportHeight);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateViewportHeight);
            }
        };
    }, []);

    const handleFocus = useCallback((e) => {
        // Nur auf Mobile-Geräten scrollen
        if (!isMobile) return;

        const contactSection = document.querySelector('.contact-page-section');
        if (contactSection) {
            contactSection.style.scrollSnapAlign = 'none';
        }

        setTimeout(() => {
            e.target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    }, [isMobile]);

    const handleBlur = useCallback(() => {
        // Nur auf Mobile-Geräten zurücksetzen
        if (!isMobile) return;

        const contactSection = document.querySelector('.contact-page-section');
        if (contactSection) {
            contactSection.style.scrollSnapAlign = 'start';
        }
    }, [isMobile]);

    const showAlert = useCallback((title, text, icon) => {
        Swal.fire({
            title,
            text,
            icon,
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                content: 'custom-swal-content',
                confirmButton: 'custom-swal-button'
            },
            buttonsStyling: false,
        });
    }, []);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData(event.target);
        formData.append("access_key", process.env.REACT_APP_WEB3FORMS_KEY);
        formData.append('botcheck', '');

        const message1 = formData.get("message1");
        const message2 = formData.get("message2");
        const combinedMessage = `${message1}\n\n${message2}`;

        formData.delete("message1");
        formData.delete("message2");
        formData.append("message", combinedMessage);

        const json = JSON.stringify(Object.fromEntries(formData));

        try {
            const res = await fetch(WEB3FORMS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const data = await res.json();

            if (data.success) {
                showAlert(
                    'Vielen Dank!',
                    'Deine Nachricht wurde erfolgreich gesendet.',
                    'success'
                );
                event.target.reset();
            } else {
                showAlert(
                    'Fehler!',
                    data.message || 'Es gab ein Problem beim Senden deiner Nachricht.',
                    'error'
                );
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert(
                'Fehler!',
                'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.',
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, showAlert]);

    return (
        <form 
            onSubmit={onSubmit} 
            className='contact-form' 
            autoComplete="on"
            noValidate
        >
            <input 
                type="checkbox" 
                name="botcheck" 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                aria-hidden="true" 
            />

            <h3>Hast du eine Frage oder möchtest du uns etwas mitteilen?</h3>

            <div className='input-Box'>
                <label htmlFor="name-input">Name</label>
                <input
                    id="name-input"
                    name='name'
                    type="text"
                    placeholder='Gib deinen Namen ein'
                    className='field'
                    required
                    autoComplete="name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-required="true"
                />
            </div>

            <div className='input-Box'>
                <label htmlFor="email-input">E-Mail</label>
                <input
                    id="email-input"
                    name='email'
                    type="email"
                    placeholder='Gib deine E-Mail ein'
                    className='field'
                    required
                    autoComplete="email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-required="true"
                />
            </div>

            <div className='response-message1'>
                <label htmlFor="message1-input">Was möchtest du uns mitteilen?</label>
                <textarea
                    id="message1-input"
                    name='message1'
                    placeholder="Vielleicht das vinz. das beste Getränk ist?"
                    className='field message'
                    required
                    autoComplete="off"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-required="true"
                />
            </div>

            <div className='response-message2'>
                <label htmlFor="message2-input">Goethe leg los!</label>
                <textarea 
                    id="message2-input"
                    name='message2'
                    placeholder='Rosen sind rot - Veilchen sind blau - Ich brauch jetzt ein vinz. sonst wird mir flau'
                    className='field message2'
                    autoComplete="off"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>

            <div className='button-container'>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? 'Nachricht wird gesendet' : 'Nachricht senden'}
                >
                    {isSubmitting ? 'Wird gesendet...' : 'senden'}
                </button>
            </div>
        </form>
    );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;