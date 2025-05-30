import React from 'react';
import './contactFormStyles.css';
import Swal from 'sweetalert2';


const ContactForm = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "2f6d0db6-4582-43bf-97e2-8cb6f58454d9");

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
              })
              event.target.reset();
            } else {
                Swal.fire({
                    title: 'Fehler!',
                    text: res.message || 'Es gab ein Problem beim Senden deiner Nachricht.',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Fehler!',
                text: 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.',
                icon: 'error',
            });
        }
    };

    return (
        <form onSubmit={onSubmit} className='contact-form'>
            <h3>Hast du eine Frage oder möchtest du uns etwas mitteilen?</h3>
            <div className='input-Box'>
                <label>Name</label>
                <input
                    name= 'name'
                    type="text"
                    placeholder='Gib deinen Namen ein'
                    className='field'
                    required  
                />
            </div>
            <div className='input-Box'>
                <label>Email</label>
                <input
                    name='email'
                    type="email"
                    placeholder='gib deine Email ein'
                    className='field'
                    required
                />
            </div>
            <div className='response-message1'>
                <label>Was möchtest du uns mitteilen?</label>
                <textarea
                    name='message1'
                    placeholder="Vielleicht das vinz. das beste Getränk ist?"
                    className='field message'
                    required
                />
            </div>
            <div className='response-message2'>
                <label>Goethe leg los!</label>
                <textarea 
                    name='message2'
                    placeholder='Rosen sind rot - Feilchen sind blau - Ich brauch jetzt ein vinz. sonst wird mir flau'
                    className='field message2'
                />
            </div>
            <div className='button-container'>
                <button type="submit">senden</button>
            </div>
        </form>
    )
}
export default ContactForm;