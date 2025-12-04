import React, { memo } from 'react';
import Images from "../../images/imageImport.js";
import "./vinzFeelingsStyles.css";

const VinzFeelings = memo(({ id }) => {
    return (
        <section 
            id={id} 
            className="vinz-feelings-section"
            aria-labelledby="vinz-feelings-heading"
        >
            <div className="vinz-feelings-section-content">
                <div className="vinz-feelings-wrapper">
                    <article className="vinz-feelings-container">
                        <figure className="vinz-feelings-image-column">
                            <img 
                                src={Images.vinzInHand} 
                                alt="vinz Bio-Limonade in der Hand vor natürlichem Hintergrund - nachhaltig und gesund" 
                                className="vinzinhand-image" 
                                loading="lazy"
                                width="800"
                                height="600"
                            />
                        </figure>

                        <div className="vinz-feelings-text-column">
                            <div className="vinz-feelings-text">
                                <header className="vinz-feelings-title-container">
                                    <h2 
                                        id="vinz-feelings-heading" 
                                        className="vinz-feelings-section-title"
                                    >
                                        vinz.
                                    </h2>
                                    <p className="vinz-feelings-section-subtitle" aria-label="Fühlsch es?">
                                        - Fühlsch es?
                                    </p>
                                </header>
                                
                                <p>
                                    <strong className="vinz-brand">vinz.</strong> steht für mehr als nur ein Getränk – es ist ein Versprechen. Ein Versprechen, deinem Körper und der Umwelt etwas Gutes zu tun. Unser Fokus liegt auf hochwertigen, gesunden Produkten, die nachhaltig und natürlich hergestellt werden.
                                </p>

                                <p>
                                    Unsere Zutaten stammen aus biologischem Anbau, und wir setzen alles daran, dir nur das Beste zu bieten – ohne Kompromisse. Bio-zertifiziert und mit Liebe zum Detail entwickelt. Hier geht es um dich: dein Wohlbefinden, deinen Genuss und deine Gesundheit.
                                </p>

                                <p>
                                    Jede Flasche <strong className="vinz-brand">vinz.</strong> vereint Handwerk, Sorgfalt und das Ziel, eine ehrliche Alternative zu schaffen. Wir glauben daran, dass Qualität kein Luxus, sondern eine Selbstverständlichkeit sein sollte.
                                </p>

                                <p>
                                    Also erfrisch di mit <strong className="vinz-brand">vinz.</strong> - fühlsch es?
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
});

VinzFeelings.displayName = 'VinzFeelings';

export default VinzFeelings;