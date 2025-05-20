import React, { memo } from 'react';
import './mixologieStyles.css';
import Images from '../../images/imageImport.js';

const Mixologie = memo(({ id }) => {
    return (
        <section id={id} className='mixologie-section'>
            <div className='mixologie-section-content'>
                <div className='mixologie-section-wrapper'>
                    <div className='mixologie-section-title'>
                        <h2>Mixologie</h2>
                    </div>
                    <div className='mixologie-cards-container'>
                        <div className='mixologie-drink-card'>
                            <img src={Images.JanamKochen} alt='vinz.-da-vinz' loading="lazy" />
                            <div className='mixologie-drink-card-content'>
                                <div className='mixologie-drink-card-title'><span className="vinz-brand">vinz.</span> <span className='daVinz'>da - vinz</span></div>
                                <div className='mixologie-drink-card-description'>
                                    <p>Leicht, frisch und schmeckt nach Sommer</p>
                                </div>
                                <div className='mixologie-drink-card-ingredients'>
                                    <p>Zutaten</p>
                                    <ul>
                                        <li>1 Flasche <span className='vinz-brand'>vinz.</span></li>
                                        <li>1 Orangenschnitz</li>
                                        <li>2 cl Vodka</li>
                                    </ul>
                                </div>
                                <div className='mixologie-drink-card-zubereitung'>
                                    <p>Zubereitung</p>
                                    <p>Trinke zwei Schlücke aus deinem <span className='vinz-brand'>vinz.</span> um die erste Erfrischung zu erhalten. 
                                        Danach füllst du den Vodka in die Flasche und drückst den Saft eines Orangen-Schnitzes in das <span className='vinz-brand'>vinz.</span> 
                                        Abschliessend nimmst du noch einen weiteren Schnitz Orange und gibst ihn ins <span className='vinz-brand'>vinz</span>. 
                                        Fertig ist deine Erfrischung
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='mixologie-drink-card'>
                            <img src={Images.JanamKochen} alt='vinz.-spritz' />
                            <div className='mixologie-drink-card-content'>
                                <div className='mixologie-drink-card-title'><span className="vinz-brand">vinz.</span> <span className='spritz'>Spritz</span></div>
                                <div className='mixologie-drink-card-description'>
                                    <p>Erfrischend mit einer floralen Note</p>
                                </div>
                                <div className='mixologie-drink-card-ingredients'>
                                    <p>Zutaten</p>
                                    <ul>
                                        <li>4cl <span className='vinz-brand'>vinz.</span></li>
                                        <li>1 Orangenschnitz</li>
                                        <li>Prosecco</li>
                                    </ul>
                                </div>
                                <div className='mixologie-drink-card-zubereitung'>
                                    <p>Zubereitung</p>
                                    <p>Fülle 4cl <span className='vinz-brand'>vinz.</span> in ein Prosecco-Glas. 
                                        Fülle es mit Prosecco auf.
                                        Fertig ist dein <span className='vinz-brand'>vinz.</span> um auf die grossen Erfolge im Leben anzustossen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Mixologie;