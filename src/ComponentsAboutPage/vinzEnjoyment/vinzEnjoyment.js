import React from 'react';
import './vinzEnjoyment.css';
import Images from '../../images/imageImport';

function vinzEnjoyment() {
    return (
    <section className="enjoyment-section">
      <div className="enjoyment-wrapper">
        <div className="about-container">
          <h1 className='title-inside-container'>
            <span className="vinz-enjoyment">Vinz.</span>
            <span className="title"> - Mehr als Genuss</span>
          </h1>
          <div className="content-wrapper">
            <div className="about-content">
              <p>An einem heißen Sommertage, an einem, an dem die Luft steht und jede Bewegung zur Herausforderung wird. Sass Jan im Schatten, zwei eiskalte Erfrischungsgetränke vor ihm – bereit, die ersehnte Abkühlung zu bringen. Doch nach den ersten Schlucken blieb nur ein Gedanke zurück: „Das war's? Nur süss? Keine echte Erfrischung, kein Wow-Effekt?"</p>
              <br />
              <p>Dieser Moment war der Anfang von <span className="vinz-inline">vinz.</span> – meiner Vision, Erfrischung neu zu definieren. Ich wollte ein Getränk, das nicht einfach nur den Durst löscht, sondern den Körper belebt und die Sinne berührt. Ein Getränk, das sich frisch anfühlt, natürlich schmeckt und dabei ganz ohne die altbekannten Klischees der Branche auskommt. Keine Zuckerbomben, kein Einheitsbrei – sondern öppis wott würkli fühlsch</p>
              <br />
              <p>Somit wurde meine Küche zum Labor, zum Ort unzähliger Experimente und lebhafter Diskussionen mit Freunden und Familie. Zwischen kochenden Töpfen, Probiergläsern und unzähligen Ideen wuchs <span className="vinz-inline">vinz.</span></p>
              <br />
              <p><span className="vinz-inline">vinz.</span> ist mehr als nur ein Erfrischungsgetränk. Es ist ein Ausdruck von Gemeinschaft, ein Produkt aus Leidenschaft und Kreativität. Jeder Schluck erzählt die Geschichte von einem Traum, der mit Hilfe der Menschen um mich wahr wurde.</p>
            </div>
          </div>
          <div className="about-image-container">
              <img 
                src={Images.JanamKochen} 
                alt="Jan Cooking" 
                className="about-story-image"
              />
          </div>
        </div>
      </div>
    </section>
  );
}

export default vinzEnjoyment;