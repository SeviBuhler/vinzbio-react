import React from "react";
import Images from "../../images/imageImport.js";
import "./vinzFeelingsStyles.css";

const VinzFeelings = ({ id }) => {
    return (
        <section id={id} className="vinz-feelings-section">
            <div className="vinz-feelings-section-content">
                <div className="vinz-feelings-wrapper">


                    <div className="vinz-feelings-container">
                        <div className="vinz-feelings-image-column">
                            <img src={Images.vinzInHand} alt="vinz in hand" className="vinzinhand-image" />
                        </div>

                        <div className="vinz-feelings-text-column">
                            <div className="vinz-feelings-text">
                                <div className="vinz-feelings-title-container">
                                    <h2 className="vinz-feelings-section-title">vinz.</h2>
                                    <h2 className="vinz-feelings-section-subtitle">- Fühlsch es?</h2>
                                </div>
                                <p><span className="vinz-brand">vinz.</span> steht für mehr als nur ein Getränk – es ist ein Versprechen. Ein Versprechen, deinem Körper und der Umwelt etwas Gutes zu tun. Unser Fokus liegt auf hochwertigen, gesunden Produkten, die nachhaltig und natürlich hergestellt werden.</p>

                                <p>Unsere Zutaten stammen aus biologischem Anbau, und wir setzen alles daran, dir nur das Beste zu bieten – ohne Kompromisse. Bio-zertifiziert und mit Liebe zum Detail entwickelt. Hier geht es um dich: dein Wohlbefinden, deinen Genuss und deine Gesundheit.</p>

                                <p>Jede Flasche <span className="vinz-brand">vinz.</span> vereint Handwerk, Sorgfalt und das Ziel, eine ehrliche Alternative zu schaffen. Wir glauben daran, dass Qualität kein Luxus, sondern eine Selbstverständlichkeit sein sollte.</p>

                                <p>Also erfrisch di mit <span className="vinz-brand">vinz.</span> - fühlsch es?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VinzFeelings;