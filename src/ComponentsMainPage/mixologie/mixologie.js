import react from 'react';
import './mixologieStyles.css';
import Images from '../../images/imageImport.js';

const Mixologie = ({ id }) => {
    return (
        <section id={id} className='mixologie-section'>
            <div className='mixologie-section-content'>
                <div className='mixologie-wrapper'>
                    <div className='mixologie-cards-container'>
                        <div className='mixologie-drink-card'>
                            <img src={Images.JanamKochen} alt='vinz.-da-vinz' className='vinzDavinz-image' />
                            <div className='mixologie-drink-card-content'>
                                <div className='mixologie-drink-card-title'>Vinz. da vinz</div>
                                <div className='mixologie-drink-card-description'></div>
                                    <p>leicht, frisch und schmeckt nach Sommer </p>
                                <div className='mixologie-drink-card-ingredients'>
                                    <p> Zutaten</p>
                                    <ul>
                                        <li>1 Flasche vinz.</li>
                                        <li>1 Orangenschnitz</li>
                                        <li>2 cl Vodka</li>
                                    </ul>
                                </div>
                                <div className='mixologie-drink-card-zubereitung'>
                                    <p>Zubereitung</p>
                                    <p> Trinke zwei Schlücke aus deinem vinz. um die erste Erfrischung zu erhalten. 
                                        Danach füllst du den Vodka in die Flasche und drückst den Saft eines Orangen-Schnitzes in das vinz. 
                                        Abschliessend nimmst du noch einen weiteren Schnitz Orange und gibst ihn ins vinz. 
                                        Fertig ist deine Erfrischung
                                    ​</p>
                                </div>
                            </div>
                        </div>
                        <div className='mixologie-drink-card'>
                            <img src={Images.JanamKochen} alt='vinz.-spritz' className='vinzSpritz-image' />
                            <div className='mixologie-drink-card-content'>
                                <div className='mixologie-drink-card-title'>Vinz. da vinz</div>
                                <div className='mixologie-drink-card-description'></div>
                                    <p>Erfrischend mit einer floralen Note </p>
                                <div className='mixologie-drink-card-ingredients'>
                                    <p> Zutaten</p>
                                    <ul>
                                        <li>4cl vinz.</li>
                                        <li>1 Orangenschnitz</li>
                                        <li>Prosecco</li>
                                    </ul>
                                </div>
                                <div className='mixologie-drink-card-zubereitung'>
                                    <p>Zubereitung</p>
                                    <p> Fülle 4cl vinz. in ein Prosecco-Glas. 
                                        Fülle es mit Prosecco auf.
                                        Fertig ist dein vinz. um auf die grossen Erfolge im Leben anzustossen.
                                    ​</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Mixologie;