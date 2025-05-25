import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import "./vinzShopStyles.css";
import Images from "../../images/imageImport.js";

const VinzShop = memo(({ id }) => {
    const productDisplayRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    // Function to open SumUp store
    const goToSumUpStore = () => {
        window.open("https://vinz.sumupstore.com/", "_blank");
    };
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
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
        
        // Initial update
        updateProgress();
        
        // Update on scroll
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
        
        // Calculate scroll distance based on card width and gap
        const scrollDistance = cardWidth + gap;
        
        // Calculate new scroll position
        const newPosition = productDisplay.scrollLeft + (direction === 'next' ? scrollDistance : -scrollDistance);
        
        // Scroll to new position with smooth behavior
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
    
    return (
        <section id={id} className="vinz-shop-section">
            <div className="vinz-shop-section-content">
                <div className="vinz-shop-wrapper">
                    <div className="vinz-shop-container">
                        {/* Image Column */}
                        <div className="vinz-shop-image-column">
                            <img 
                                src={Images.vinzGeländer || Images.vinzShop} 
                                alt="vinz Flaschen" 
                                className="vinz-shop-image"
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Title Area */}
                        <div className="vinz-shop-header">
                            <h2 className="vinz-shop-title">Shop</h2>    
                            <div className="vinz-shop-intro">
                                <p>Entdecke unseren Onlineshop und bestelle dein <span className="vinz-brand">vinz.</span> zu dir nach Hause</p>
                            </div>
                        </div>
                        
                        {/* Products Area with Fixed Navigation */}
                        <div className="vinz-product-display-container">
                            {/* Navigation arrows fixed to container */}
                            {!isMobile && (
                                <>
                                    <button 
                                        className="slider-nav prev"
                                        onClick={() => handleNavigation('prev')}
                                        aria-label="Previous product"
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        className="slider-nav next"
                                        onClick={() => handleNavigation('next')}
                                        aria-label="Next product"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                            
                            <div className="vinz-product-display snaps-inline" ref={productDisplayRef}>
                                {/* Product cards */}
                                <a className="vinz-product-card" href="https://vinz.sumupstore.com/produkt/vinz-original-sixpack-3-15-flasche" target="_blank" rel="noopener noreferrer">
                                    <div className="vinz-product-image">
                                        <img 
                                            src={Images.vinzOriginal || Images.vinzShop}
                                            alt="vinz Original Sixpack" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="vinz-product-details">
                                        <h3><span className="vinz-brand">vinz.</span> Original - Sixpack</h3>
                                        <span className="vinz-product-price">CHF 18.90</span>
                                    </div>
                                </a>

                                <a className="vinz-product-card" href="https://vinz.sumupstore.com/produkt/vinz-original-24-flaschen-3-25-flasche-1" target="_blank" rel="noopener noreferrer">
                                    <div className="vinz-product-image">
                                        <img 
                                            src={Images.vinzShop}
                                            alt="vinz Original"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="vinz-product-details">
                                        <h3><span className="vinz-brand">vinz.</span> Original - 24 Flaschen</h3>
                                        <span className="vinz-product-price">CHF 79</span>
                                    </div>
                                </a>

                                <a className="vinz-product-card" href="https://vinz.sumupstore.com/produkt/vinz-original-partymenge-240-flaschen" target="_blank" rel="noopener noreferrer">
                                    <div className="vinz-product-image">
                                        <img 
                                            src={Images.vinzShop2}
                                            alt="vinz Original" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="vinz-product-details">
                                        <h3><span className="vinz-brand">vinz.</span> Original - Partymenge</h3>
                                        <span className="vinz-product-price">CHF 660</span>
                                    </div>
                                </a>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="slider-progress" onClick={handleProgressBarClick}>
                                <div className="slider-progress-bar" ref={progressBarRef}></div>
                            </div>
                        </div>

                        {/* Button Area */}
                        <div className="vinz-shop-header-right">
                            <div className="vinz-shop-cta">
                                <button onClick={goToSumUpStore} className="vinz-shop-button">
                                    Zum Shop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default VinzShop;