import React, { memo, useState, useEffect, useRef } from 'react';
import './mixologieStyles.css';
import Images from '../../images/imageImport.js';

const CARDS_DATA = [
    {
        id: 'davinz',
        titleLeft: 'da -',
        titleBrand: 'vinz.',
        image: Images.JanamKochen,
        alt: 'vinz.-da-vinz',
        description: 'Leicht, frisch und schmeckt nach Sommer',
        ingredients: ['1 Flasche vinz.', '1 Orangenschnitz', '2 cl Vodka'],
        preparation: `Trinke zwei Schlücke aus deinem vinz. um die erste Erfrischung zu erhalten. Danach füllst du den Vodka in die Flasche und drückst den Saft eines Orangen-Schnitzes in das vinz. Abschliessend nimmst du noch einen weiteren Schnitz Orange und gibst ihn ins vinz. Fertig ist deine Erfrischung`
    },
    {
        id: 'spritz',
        titleLeft: '',
        titleBrand: 'vinz.',
        titleRight: 'Spritz',
        image: Images.JanamKochen,
        alt: 'vinz.-spritz',
        description: 'Erfrischend mit einer floralen Note',
        ingredients: ['4cl vinz.', '1 Orangenschnitz', 'Prosecco'],
        preparation: `Fülle 4cl vinz. in ein Prosecco-Glas. Fülle es mit Prosecco auf. Fertig ist dein vinz. um auf die grossen Erfolge im Leben anzustossen.`
    }
];


const Mixologie = memo(({ id }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isExpandable, setIsExpandable] = useState(window.innerWidth < 1200);
    const cardRefs = useRef({});

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsExpandable(window.innerWidth < 1200);
            if (window.innerWidth >= 1200) {
                setExpandedCard(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCard = (cardId) => {
        const newExpandedCard = expandedCard === cardId ? null : cardId;
        setExpandedCard(newExpandedCard);

        if (newExpandedCard && cardRefs.current[cardId]) {
            setTimeout(() => {
                const cardElement = cardRefs.current[cardId];
                const yOffset = -100; 
                const y = cardElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 250);
        }
    };

    const modalRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && expandedCard) setExpandedCard(null);
        };

        if (expandedCard) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', onKey);
            setTimeout(() => modalRef.current?.focus?.(), 80);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [expandedCard]);

    return (
        <section id={id} className='mixologie-section'>
            <div className='mixologie-section-content'>
                <div className='mixologie-section-wrapper'>
                    <div className='mixologie-section-title'>
                        <h2>Mixologie</h2>
                    </div>
                    <div className='mixologie-cards-container'>
                        {CARDS_DATA.map(card => (
                            <div
                                ref={el => cardRefs.current[card.id] = el}
                                className={`mixologie-drink-card`}
                                onClick={() => toggleCard(card.id)}
                            >
                                <div className='mixologie-drink-card-title'>
                                    <p></p>
                                    <div>
                                        {card.titleLeft && <span className='daVinz'>{card.titleLeft} </span>}
                                        <span className="vinz-brand">{card.titleBrand}</span>
                                        {card.titleRight && <span className='spritz'> {card.titleRight}</span>}
                                    </div>
                                    {isExpandable && <span className={`expand-icon ${expandedCard === card.id ? 'expanded' : ''}`}>{expandedCard === card.id ? '−' : '+'}</span>}
                                </div>
                            </div>
                        ))}

                        {/* single modal renderer - findet die aktive Card in CARDS_DATA */}
                        {expandedCard && (() => {
                            const active = CARDS_DATA.find(card => card.id === expandedCard);
                            
                            if (!active) return null;

                            return (
                                <div className='mixologie-modal-overlay' onClick={() => setExpandedCard(null)}>
                                    <div
                                        className='mixologie-modal'
                                        role='dialog'
                                        aria-modal='true'
                                        tabIndex='-1'
                                        ref={modalRef}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button className='mixologie-modal-close' aria-label='Close' onClick={() => setExpandedCard(null)}>×</button>
                                        <div className='mixologie-modal-inner'>
                                            <img src={active.image} alt={active.alt} loading="lazy" />
                                            <h3 className='mixologie-modal-title'>
                                                {active.titleLeft && <span className='daVinz'>{active.titleLeft} </span>}
                                                <span className="vinz-brand">{active.titleBrand}</span>
                                                {active.titleRight && <span className='spritz'> {active.titleRight}</span>}
                                            </h3>
                                            <div className='mixologie-drink-card-content'>
                                                <div className='mixologie-drink-card-description'>
                                                    <p>{active.description}</p>
                                                </div>
                                                <div className='mixologie-drink-card-ingredients'>
                                                    <p>Zutaten</p>
                                                    <ul>
                                                        {active.ingredients.map((ing, i) => <li key={i} dangerouslySetInnerHTML={{__html: ing.replace(/vinz\./g, `<span class='vinz-brand'>vinz.</span>`)}} />)}
                                                    </ul>
                                                </div>
                                                <div className='mixologie-drink-card-zubereitung'>
                                                    <p>Zubereitung</p>
                                                    <p dangerouslySetInnerHTML={{__html: active.preparation.replace(/vinz\./g, `<span class='vinz-brand'>vinz.</span>`)}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Mixologie;