import React, { memo } from "react";
import "./vinzShopStyles.css";
import Images from "../../images/imageImport.js";

const VinzShop = memo(({ id }) => {
    const goToSumUpStore = () => {
        window.open("https://vinz.sumupstore.com/", "_blank");
    };

    return (
        <section id={id} className="vinz-shop-section">
            <div className="vinz-shop-section-content">
                <div className="vinz-shop-wrapper">
                    <div className="vinz-shop-container">
                        {/* New: Image Column (Left Side) */}
                        <div className="vinz-shop-image-column">
                            <img 
                                src={Images.vinzGeländer || Images.vinzShop} 
                                alt="vinz Flaschen" 
                                className="vinz-shop-image"
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Title Area (Top Right) */}
                        <div className="vinz-shop-header">
                            <h2 className="vinz-shop-title">Shop</h2>    
                            <div className="vinz-shop-intro">
                                <p>Entdecke unseren Onlineshop und bestelle dein <span className="vinz-brand">vinz.</span> zu dir nach Hause</p>
                            </div>
                        </div>
                        
                        {/* Products Area (Bottom Middle) */}
                        <div className="vinz-product-display">
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
                                    <h3><span className="vinz-brand">vinz.</span> Original - Partymenge (240 Flaschen)</h3>
                                    <span className="vinz-product-price">CHF 660</span>
                                </div>
                            </a>
                        </div>
                        
                        {/* Button Area (Bottom Right) */}
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