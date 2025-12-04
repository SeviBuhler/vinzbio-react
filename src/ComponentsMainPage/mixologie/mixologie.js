import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import './mixologieStyles.css';
import Images from '../../images/imageImport.js';

const CARDS_DATA = [
    {
        id: 'davinz',
        titleLeft: 'da -',
        titleBrand: 'vinz.',
        image: Images.JanamKochen,
        alt: 'vinz da-vinz Cocktail Rezept - erfrischender Sommerdrink',
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
        alt: 'vinz Spritz Cocktail Rezept - erfrischend mit floraler Note',
        description: 'Erfrischend mit einer floralen Note',
        ingredients: ['4cl vinz.', '1 Orangenschnitz', 'Prosecco'],
        preparation: `Fülle 4cl vinz. in ein Prosecco-Glas. Fülle es mit Prosecco auf. Fertig ist dein vinz. um auf die grossen Erfolge im Leben anzustossen.`
    }
];

const Mixologie = memo(({ id }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const cardRefs = useRef({});
    const modalRef = useRef(null);

    const toggleCard = useCallback((cardId) => {
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
    }, [expandedCard]);

    const closeModal = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setExpandedCard(null);
            setIsClosing(false);
        }, 250);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && expandedCard) closeModal();
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
    }, [expandedCard, closeModal]);

    return (
        <section 
            id={id} 
            className='mixologie-section'
            aria-labelledby="mixologie-heading"
        >
            <div className='mixologie-section-content'>
                <div className='mixologie-section-wrapper'>
                    <header className='mixologie-section-title'>
                        <h2 id="mixologie-heading">Mixologie</h2>
                    </header>
                    <div 
                        className='mixologie-cards-container'
                        role="list"
                        aria-label="Cocktail Rezepte"
                    >
                        {CARDS_DATA.map(card => (
                            <article
                                key={card.id}
                                ref={el => cardRefs.current[card.id] = el}
                                className='mixologie-drink-card'
                                onClick={() => toggleCard(card.id)}
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        toggleCard(card.id);
                                    }
                                }}
                                aria-label={`${card.titleLeft || ''}${card.titleBrand}${card.titleRight || ''} Cocktail Rezept öffnen`}
                                aria-expanded={expandedCard === card.id}
                            >
                                <div className='mixologie-drink-card-title'>
                                    <span></span>
                                    <div>
                                        {card.titleLeft && <span className='daVinz'>{card.titleLeft} </span>}
                                        <span className="vinz-brand">{card.titleBrand}</span>
                                        {card.titleRight && <span className='spritz'> {card.titleRight}</span>}
                                    </div>
                                    <span 
                                        className={`expand-icon ${expandedCard === card.id ? 'expanded' : ''}`}
                                        aria-hidden="true"
                                    >
                                        {expandedCard === card.id ? '−' : '+'}
                                    </span>
                                </div>
                            </article>
                        ))}

                        {/* Modal Overlay */}
                        {expandedCard && (() => {
                            const active = CARDS_DATA.find(card => card.id === expandedCard);
                            
                            if (!active) return null;

                            return (
                                <div 
                                    className={`mixologie-modal-overlay ${isClosing ? 'closing' : ''}`} 
                                    onClick={closeModal}
                                    role="presentation"
                                >
                                    <article
                                        className='mixologie-modal'
                                        role='dialog'
                                        aria-modal='true'
                                        aria-labelledby="modal-title"
                                        tabIndex='-1'
                                        ref={modalRef}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button 
                                            className='mixologie-modal-close' 
                                            aria-label='Rezept schließen' 
                                            onClick={closeModal}
                                            type="button"
                                        >
                                            ×
                                        </button>
                                        <div className='mixologie-modal-inner'>
                                            <figure className='mixologie-modal-image'>
                                                <img 
                                                    src={active.image} 
                                                    alt={active.alt}
                                                    loading="lazy"
                                                    width="800"
                                                    height="600"
                                                />
                                            </figure>
                                            <h3 
                                                id="modal-title"
                                                className='mixologie-modal-title'
                                            >
                                                {active.titleLeft && <span className='daVinz'>{active.titleLeft} </span>}
                                                <span className="vinz-brand">{active.titleBrand}</span>
                                                {active.titleRight && <span className='spritz'> {active.titleRight}</span>}
                                            </h3>
                                            <div className='mixologie-drink-card-content'>
                                                <div className='mixologie-drink-card-description'>
                                                    <p>{active.description}</p>
                                                </div>
                                                <div className='mixologie-drink-card-ingredients'>
                                                    <h4>Zutaten</h4>
                                                    <ul>
                                                        {active.ingredients.map((ing, i) => (
                                                            <li 
                                                                key={i}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: ing.replace(/vinz\./g, `<span class='vinz-brand'>vinz.</span>`)
                                                                }} 
                                                            />
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='mixologie-drink-card-zubereitung'>
                                                    <h4>Zubereitung</h4>
                                                    <p 
                                                        dangerouslySetInnerHTML={{
                                                            __html: active.preparation.replace(/vinz\./g, `<span class='vinz-brand'>vinz.</span>`)
                                                        }} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </section>
    );
});

Mixologie.displayName = 'Mixologie';

export default Mixologie;