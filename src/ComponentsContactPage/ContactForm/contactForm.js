import React from 'react';
import './contactFormStyles.css';
import Swal from 'sweetalert2';


const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Viewport-Höhe dynamisch anpassen bei Keyboard-Öffnung
    React.useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Initial setzen
        handleResize();

        // Bei Resize aktualisieren
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // iOS-spezifisch: visualViewport API
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    // Scroll-Snap bei Focus deaktivieren
    const handleFocus = (e) => {
        const contactSection = document.querySelector('.contact-page-section');
        if (contactSection) {
            contactSection.style.scrollSnapAlign = 'none';
        }

        // Sanftes Scrollen zum Input-Feld (optional)
        setTimeout(() => {
            e.target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    };

    const handleBlur = () => {
        const contactSection = document.querySelector('.contact-page-section');
        if (contactSection) {
            contactSection.style.scrollSnapAlign = 'start';
        }
    };

    const onSubmit = async (event) => {
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

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
                body: json
            }).then((res) => res.json());

            if (res.success) {
              console.log("Success", res);
              Swal.fire({
                  title: 'Vielen Dank!',
                  text: 'Deine Nachricht wurde erfolgreich gesendet.',
                  icon: 'success',
                  customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-button'
                  },
                  buttonsStyling: false,
              })
              event.target.reset();
            } else {
                Swal.fire({
                    title: 'Fehler!',
                    text: res.message || 'Es gab ein Problem beim Senden deiner Nachricht.',
                    icon: 'error',
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-button'
                    },
                    buttonsStyling: false,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Fehler!',
                text: 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.',
                icon: 'error',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    confirmButton: 'custom-swal-button'
                },
                buttonsStyling: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className='contact-form' autoComplete="on">
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />

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
                />
            </div>
            <div className='input-Box'>
                <label htmlFor="email-input">Email</label>
                <input
                    id="email-input"
                    name='email'
                    type="email"
                    placeholder='Gib deine Email ein'
                    className='field'
                    required
                    autoComplete="email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
                />
            </div>
            <div className='response-message2'>
                <label htmlFor="message2-input">Goethe leg los!</label>
                <textarea 
                    id="message2-input"
                    name='message2'
                    placeholder='Rosen sind rot - Feilchen sind blau - Ich brauch jetzt ein vinz. sonst wird mir flau'
                    className='field message2'
                    autoComplete="off"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className='button-container'>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Wird gesendet...' : 'senden'}
                </button>
            </div>
        </form>
    )
}
export default ContactForm;