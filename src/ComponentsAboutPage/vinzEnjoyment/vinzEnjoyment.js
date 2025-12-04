import React from 'react';
import './vinzEnjoyment.css';
import Images from '../../images/imageImport';

const VinzEnjoyment = () => {
  return (
    <section className="enjoyment-section" aria-labelledby="enjoyment-title">
      <div className="enjoyment-wrapper">
        <article className="about-container">
          <header>
            <h1 className='title-inside-container' id="enjoyment-title">
              <span className="vinz-enjoyment">Vinz.</span>
              <span className="title"> - Mehr als Genuss</span>
            </h1>
          </header>
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
          <figure className="about-image-container">
            <img 
              src={Images.JanamKochen} 
              alt="Jan beim Kochen und Entwickeln von vinz. in der Küche" 
              className="about-story-image"
              loading="lazy"
              width="800"
              height="1200"
            />
          </figure>
        </article>
      </div>
    </section>
  );
};

export default VinzEnjoyment;