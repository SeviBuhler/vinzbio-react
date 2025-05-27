import React, { memo, useState, useEffect } from 'react';
import './mixologieStyles.css';
import Images from '../../images/imageImport.js';

const Mixologie = memo(({ id }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const smallMobile = window.innerWidth <= 375;

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setExpandedCard(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto expand the first card on mobile during inital load
    useEffect(() => {
        if (isMobile && !smallMobile) {
            setExpandedCard('davinz');
        }
    }, [isMobile, smallMobile])

    // toggle card expansion
    const toggleCard = (cardId) => {
        if (isMobile) {
            setExpandedCard(expandedCard === cardId ? null : cardId);
        }
    };

    return (
        <section id={id} className='mixologie-section'>
            <div className='mixologie-section-content'>
                <div className='mixologie-section-wrapper'>
                    <div className='mixologie-section-title'>
                        <h2>Mixologie</h2>
                    </div>
                    <div className='mixologie-cards-container'>
                        {/* First Card: da vinz */}
                        <div
                            className={`mixologie-drink-card ${expandedCard === 'davinz' ? 'expanded-card' : ''}`}
                            onClick={() => toggleCard('davinz')}
                        >   
                            <div className='mixologie-drink-card-title'>
                                <p></p>
                                <div>
                                    <span className='daVinz'>da - </span> <span className="vinz-brand">vinz.</span>
                                </div>
                                {isMobile && <span className='expand-icon'>{expandedCard === 'davinz' ? '−' : '+'}</span>}   
                            </div>
                            <img src={Images.JanamKochen} alt='vinz.-da-vinz' loading="lazy" />
                            <div className='mixologie-drink-card-content'>
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
                        {/* Second Card: Spritz */}
                        <div
                            className={`mixologie-drink-card ${expandedCard === 'spritz' ? 'expanded-card' : ''}`}
                            onClick={() => toggleCard('spritz')}
                        >   
                            <div className='mixologie-drink-card-title'>
                                <p></p>
                                <div>
                                    <span className="vinz-brand">vinz.</span> <span className='spritz'>Spritz</span>
                                </div>
                                {isMobile && <span className='expand-icon'>{expandedCard === 'spritz' ? '−' : '+'}</span>}
                            </div>
                            <img src={Images.JanamKochen} alt='vinz.-spritz' />
                            <div className='mixologie-drink-card-content'>
                                
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