import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import "./vinzShopStyles.css";
import Images from "../../images/imageImport.js";

// Product data for better maintainability
const PRODUCTS = [
    {
        id: 'sixpack',
        name: 'Original - Sixpack',
        price: 'CHF 18.90',
        image: 'vinzOriginal',
        url: 'https://vinz.sumupstore.com/produkt/vinz-original-sixpack-3-15-flasche',
        alt: 'vinz Original Sixpack - 6 Flaschen Bio-Limonade'
    },
    {
        id: '24pack',
        name: 'Original - 24 Flaschen',
        price: 'CHF 79',
        image: 'vinzShop',
        url: 'https://vinz.sumupstore.com/produkt/vinz-original-24-flaschen-3-25-flasche-1',
        alt: 'vinz Original - 24 Flaschen Bio-Limonade Großpackung'
    },
    {
        id: 'party',
        name: 'Original - Partymenge',
        price: 'CHF 660',
        image: 'vinzShop2',
        url: 'https://vinz.sumupstore.com/produkt/vinz-original-partymenge-240-flaschen',
        alt: 'vinz Original Partymenge - 240 Flaschen für Events'
    }
];

const SHOP_URL = 'https://vinz.sumupstore.com/';
const MOBILE_BREAKPOINT = 768;

const VinzShop = memo(({ id }) => {
    const productDisplayRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Update progress bar based on scroll position
    useEffect(() => {
        const productDisplay = productDisplayRef.current;
        const progressBar = progressBarRef.current;
        
        if (!productDisplay || !progressBar) return;
        
        const updateProgress = () => {
            const scrollWidth = productDisplay.scrollWidth - productDisplay.clientWidth;
            if (scrollWidth <= 0) {
                progressBar.style.width = '0%';
                return;
            }
            
            const scrollPercent = (productDisplay.scrollLeft / scrollWidth) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };
        
        updateProgress();
        productDisplay.addEventListener('scroll', updateProgress, { passive: true });
        
        return () => {
            productDisplay.removeEventListener('scroll', updateProgress);
        };
    }, []);
    
    // Handle navigation arrows
    const handleNavigation = useCallback((direction) => {
        const productDisplay = productDisplayRef.current;
        if (!productDisplay) return;
        
        const cardWidth = productDisplay.querySelector('.vinz-product-card')?.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(productDisplay).columnGap) || 20;
        const scrollDistance = cardWidth + gap;
        const newPosition = productDisplay.scrollLeft + (direction === 'next' ? scrollDistance : -scrollDistance);
        
        productDisplay.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
    }, []);
    
    // Handle progress bar click
    const handleProgressBarClick = useCallback((e) => {
        const productDisplay = productDisplayRef.current;
        if (!productDisplay) return;
        
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const scrollWidth = productDisplay.scrollWidth - productDisplay.clientWidth;
        const scrollTarget = scrollWidth * clickPosition;
        
        productDisplay.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
        });
    }, []);
    
    // Open shop in new tab
    const goToSumUpStore = useCallback(() => {
        window.open(SHOP_URL, "_blank", "noopener,noreferrer");
    }, []);
    
    return (
        <section 
            id={id} 
            className="vinz-shop-section"
            aria-labelledby="vinz-shop-heading"
        >
            <div className="vinz-shop-section-content">
                <div className="vinz-shop-wrapper">
                    <article className="vinz-shop-container">
                        {/* Image Column */}
                        <figure className="vinz-shop-image-column">
                            <img 
                                src={Images.vinzGeländer || Images.vinzShop} 
                                alt="vinz Bio-Limonade Flaschen im Regal - nachhaltig verpackt" 
                                className="vinz-shop-image"
                                loading="lazy"
                                width="800"
                                height="600"
                            />
                        </figure>
                        
                        {/* Title Area */}
                        <header className="vinz-shop-header">
                            <h2 
                                id="vinz-shop-heading" 
                                className="vinz-shop-title"
                            >
                                Shop
                            </h2>    
                            <div className="vinz-shop-intro">
                                <p>
                                    Entdecke unseren Onlineshop und bestelle dein <span className="vinz-brand">vinz.</span> zu dir nach Hause
                                </p>
                            </div>
                        </header>
                        
                        {/* Products Area with Navigation */}
                        <div className="vinz-product-display-container">
                            {/* Navigation arrows for desktop */}
                            {!isMobile && (
                                <>
                                    <button 
                                        className="slider-nav prev"
                                        onClick={() => handleNavigation('prev')}
                                        aria-label="Vorheriges Produkt anzeigen"
                                        type="button"
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        className="slider-nav next"
                                        onClick={() => handleNavigation('next')}
                                        aria-label="Nächstes Produkt anzeigen"
                                        type="button"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                            
                            <div 
                                className="vinz-product-display snaps-inline" 
                                ref={productDisplayRef}
                                role="list"
                                aria-label="vinz Produkte"
                            >
                                {PRODUCTS.map((product) => (
                                    <a 
                                        key={product.id}
                                        className="vinz-product-card" 
                                        href={product.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        role="listitem"
                                        aria-label={`${product.name} für ${product.price} kaufen`}
                                    >
                                        <figure className="vinz-product-image">
                                            <img 
                                                src={Images[product.image] || Images.vinzShop}
                                                alt={product.alt}
                                                loading="lazy"
                                                width="400"
                                                height="400"
                                            />
                                        </figure>
                                        <div className="vinz-product-details">
                                            <h3>
                                                <span className="vinz-brand">vinz.</span> {product.name}
                                            </h3>
                                            <span className="vinz-product-price" aria-label={`Preis: ${product.price}`}>
                                                {product.price}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            
                            {/* Progress bar */}
                            <div 
                                className="slider-progress" 
                                onClick={handleProgressBarClick}
                                role="progressbar"
                                aria-label="Produktgalerie Fortschritt"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                tabIndex="0"
                            >
                                <div className="slider-progress-bar" ref={progressBarRef}></div>
                            </div>
                        </div>

                        {/* Button Area */}
                        <div className="vinz-shop-header-right">
                            <div className="vinz-shop-cta">
                                <button 
                                    onClick={goToSumUpStore} 
                                    className="vinz-shop-button"
                                    type="button"
                                    aria-label="Zum vinz Online-Shop wechseln"
                                >
                                    Zum Shop
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
});

VinzShop.displayName = 'VinzShop';

export default VinzShop;