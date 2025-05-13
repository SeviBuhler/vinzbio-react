import React, { useRef, useEffect, useState, useMemo } from 'react';
import './headerStyles.css';
import Images from '../../images/imageImport.js';

const Header = () => {
  const bottleRef = useRef(null);
  const blauerBogenRef = useRef(null);
  const orangerPunktRef = useRef(null);
  const [vinzText, setVinzText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const fullVinzText = 'vinz.';
  const fullOriginalText = 'Original';

  // Single source of truth for ingredient positions
  const ingredientPositions = useMemo(() => ({
    apfelessig: {
      initial: { transform: 'translate(-50%, -50%) rotate(-15deg)', opacity: '0' },
      animated: { transform: 'translate(3vw, -20vh) rotate(20deg)', opacity: '1' }
    },
    honig: {
      initial: { transform: 'translate(-50%, -50%) rotate(-20deg)', opacity: '0' },
      animated: { transform: 'translate(3vw, 5vh) rotate(20deg)', opacity: '1' }
    },
    ingwer: {
      initial: { transform: 'translate(-50%, -50%) rotate(15deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, 6vh) rotate(5deg)', opacity: '1' }
    },
    zitrone: {
      initial: { transform: 'translate(-50%, -50%) rotate(45deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, -10vh) rotate(15deg)', opacity: '1' }
    },
    minze: {
      initial: { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: '0',},
      animated: { transform: 'translate(-12vw, 20vh) rotate(-20deg)', opacity: '1' }
    }
  }), []);

  // Animation for the bottle, arch and orange dot
  useEffect(() => {
    // Check if we're already scrolled down
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer && snapContainer.scrollTop > window.innerHeight * 0.5) {
      // Skip ingredient animations if we're not at the top
      return;
    }

    const bottle = bottleRef.current;
    const blauerBogen = blauerBogenRef.current;
    const orangerPunkt = orangerPunktRef.current;

    // Get all ingredient images
    const apfelessig = document.querySelector('.apfelessig');
    const honig = document.querySelector('.honig');
    const ingwer = document.querySelector('.ingwer');
    const zitrone = document.querySelector('.zitrone');
    const minze = document.querySelector('.minze');

    // Force reflow before setting initial states
    void document.body.offsetHeight;

    // Initial states
    if (bottle) {
      bottle.style.transform = 'translate(-50%, -250vh)';
      bottle.style.opacity = '1';
      void bottle.offsetHeight;
    }
    
    if (blauerBogen) {
      blauerBogen.style.transform = 'translateY(-300px)';
      blauerBogen.style.opacity = '0';
      void blauerBogen.offsetHeight;
    }
    
    if (orangerPunkt) {
      orangerPunkt.style.opacity = '0';
      orangerPunkt.style.transform = 'scale(0.2)';
      void orangerPunkt.offsetHeight;
    }

    if (apfelessig) {
      Object.entries(ingredientPositions.apfelessig.initial).forEach(([prop, value]) => {
        apfelessig.style[prop] = value;
      });
    }

    if (honig) {
      Object.entries(ingredientPositions.honig.initial).forEach(([prop, value]) => {
        honig.style[prop] = value;
      });
    }

    if (ingwer) {
      Object.entries(ingredientPositions.ingwer.initial).forEach(([prop, value]) => {
        ingwer.style[prop] = value;
      });
    }

    if (zitrone) {
      Object.entries(ingredientPositions.zitrone.initial).forEach(([prop, value]) => {
        zitrone.style[prop] = value;
      });
    }

    if (minze) {
      Object.entries(ingredientPositions.minze.initial).forEach(([prop, value]) => {
        minze.style[prop] = value;
      });
    }

    // Animation sequence
    // 1. Bottle flies in
    setTimeout(() => {
      if (bottle) bottle.style.transform = 'translate(-50%, -50%)';
    }, 300);

    // 2. Blue arch appears
    setTimeout(() => {
      if (blauerBogen) {
        blauerBogen.style.transition = 'transform 1.5s ease-out, opacity 0.5s ease-in';
        blauerBogen.style.transform = 'translateY(0)';
        blauerBogen.style.opacity = '1';
      }
    }, 1000);
    
    // 3. Orange dot appears
    setTimeout(() => {
      if (orangerPunkt) {
        orangerPunkt.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-in';
        orangerPunkt.style.transform = 'scale(1)';
        orangerPunkt.style.opacity = '1';
      }
    }, 1500);

    const ingredientsDelay = 1800;
    
    // Right side ingredients
    setTimeout(() => {
      if (apfelessig) {
        Object.entries(ingredientPositions.apfelessig.animated).forEach(([prop, value]) => {
          apfelessig.style[prop] = value;
        });
      }
    }, ingredientsDelay);
    
    setTimeout(() => {
      if (honig) {
        Object.entries(ingredientPositions.honig.animated).forEach(([prop, value]) => {
          honig.style[prop] = value;
        });
      }
    }, ingredientsDelay);
    
    // Left side ingredients
    setTimeout(() => {
      if (zitrone) {
        Object.entries(ingredientPositions.zitrone.animated).forEach(([prop, value]) => {
          zitrone.style[prop] = value;
        });
      }
    }, ingredientsDelay);

    setTimeout(() => {
      if (ingwer) {
        Object.entries(ingredientPositions.ingwer.animated).forEach(([prop, value]) => {
          ingwer.style[prop] = value;
        });
      }
    }, ingredientsDelay);
    
    setTimeout(() => {
      if (minze) {
        Object.entries(ingredientPositions.minze.animated).forEach(([prop, value]) => {
          minze.style[prop] = value;
        });
      }
    }, ingredientsDelay);
  }, [ingredientPositions]);
  

  // Scroll animation for ingredients
  useEffect(() => {
    // Create an object using your EXACT values from initial animation code
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');

      if (!snapContainer) {
        console.error('Snap container not found!');
        return;
      }

      const scrollY = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;

      // Get all ingredients
      const apfelessig = document.querySelector('.apfelessig');
      const honig = document.querySelector('.honig');
      const ingwer = document.querySelector('.ingwer');
      const zitrone = document.querySelector('.zitrone');
      const minze = document.querySelector('.minze');

      const ingredients = [apfelessig, honig, ingwer, zitrone, minze].filter(Boolean);

      // Calculate fade out based on scroll position
      if (scrollY > viewportHeight * 0.05) {
        // Fade out quickly
        const opacity = Math.max(0, 1 - (scrollY - viewportHeight * 0.05) / (viewportHeight * 0.1));

        ingredients.forEach((ingredient) => {
          if (ingredient) {
            // Get the class name to match with our config object
            const className = ingredient.className;
            const type = Object.keys(ingredientPositions).find(key => className.includes(key));

            if (!type) return;

            // Adjust opacity based on scroll
            ingredient.style.opacity = opacity.toString();

            // Extract position values from animated transform
            if (!ingredient.dataset.animatedX || !ingredient.dataset.animatedY) {
              const animatedTransform = ingredientPositions[type].animated.transform;
              const translateMatch = animatedTransform.match(/translate\(([^,]+), ([^)]+)\)/);
              const rotateMatch = animatedTransform.match(/rotate\(([^)]+)\)/);

              if (translateMatch) {
                ingredient.dataset.animatedX = translateMatch[1];
                ingredient.dataset.animatedY = translateMatch[2];
              }

              if (rotateMatch) {
                ingredient.dataset.animatedRotation = rotateMatch[1];
              }
            }

            const animatedX = ingredient.dataset.animatedX || '0';
            const animatedY = ingredient.dataset.animatedY || '0';
            const rotation = ingredient.dataset.animatedRotation || '0deg';

            // Move ingredient back toward center as it fades out
            const progress = 1 - opacity;

            ingredient.style.transform = `translate(${animatedX}, ${animatedY}) 
                                         translate(${-progress * 50}px, ${-progress * 50}px) 
                                         rotate(${rotation})`;

            // When almost invisible and scrolled far enough, reset to initial state
            if (opacity < 0.1) {
              if (scrollY > viewportHeight * 0.5) {
                // Use initial state directly from our object
                Object.entries(ingredientPositions[type].initial).forEach(([prop, value]) => {
                  ingredient.style[prop] = value;
                });
              }
            }
          }
        });
      } else if (scrollY <= viewportHeight * 0.05) {
        // Scrolled back to header section
        let needsAnimation = false;

        // Check if any ingredient is in initial state
        ingredients.forEach(ingredient => {
          if (!ingredient) return;

          const className = ingredient.className;
          const type = Object.keys(ingredientPositions).find(key => className.includes(key));
          if (!type) return;

          // Check if in initial state by checking opacity
          if (ingredient.style.opacity === '0') {
            needsAnimation = true;
          }
        });

        if (needsAnimation) {
          // Re-animate like the initial animation sequence
          const ingredientsDelay = 1800; // Faster re-animation

          // Right side ingredients
          setTimeout(() => {
            if (apfelessig) {
              Object.entries(ingredientPositions.apfelessig.animated).forEach(([prop, value]) => {
                apfelessig.style[prop] = value;
              });
            }
          }, ingredientsDelay);

          setTimeout(() => {
            if (honig) {
              Object.entries(ingredientPositions.honig.animated).forEach(([prop, value]) => {
                honig.style[prop] = value;
              });
            }
          }, ingredientsDelay + 100);

          // Left side ingredients
          setTimeout(() => {
            if (zitrone) {
              Object.entries(ingredientPositions.zitrone.animated).forEach(([prop, value]) => {
                zitrone.style[prop] = value;
              });
            }
          }, ingredientsDelay + 200);

          setTimeout(() => {
            if (ingwer) {
              Object.entries(ingredientPositions.ingwer.animated).forEach(([prop, value]) => {
                ingwer.style[prop] = value;
              });
            }
          }, ingredientsDelay + 300);

          setTimeout(() => {
            if (minze) {
              Object.entries(ingredientPositions.minze.animated).forEach(([prop, value]) => {
                minze.style[prop] = value;
              });
            }
          }, ingredientsDelay + 400);
        } else {
          // If not in initial state, smooth return to animated position
          ingredients.forEach((ingredient) => {
            if (ingredient) {
              const className = ingredient.className;
              const type = Object.keys(ingredientPositions).find(key => className.includes(key));
              if (!type) return;

              // Smooth fade-in based on scroll percentage
              const returnProgress = Math.min(1, 1 - (scrollY / (viewportHeight * 0.05)));

              // Use stored values for smooth transition
              const animatedX = ingredient.dataset.animatedX || '0';
              const animatedY = ingredient.dataset.animatedY || '0';
              const rotation = ingredient.dataset.animatedRotation || '0deg';

              // Fade in smoothly
              ingredient.style.opacity = returnProgress.toString();
              ingredient.style.transform = `translate(${animatedX}, ${animatedY}) rotate(${rotation})`;
            }
          });
        }
      }
    };

    // Find the snap container and set up event listener
    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial state

      // Clean up
      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ingredientPositions]);


  // Text animation for "vinz."
  useEffect(() => {
    let currentIndex = 0;
    const startDelay = 1000;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullVinzText.length) {
          setVinzText(fullVinzText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 150)

      return () => clearInterval(interval);
    }, startDelay);
  }, []);

  // Text animation for "Original"
  useEffect(() => {
    let currentIndex = 0;
    const startDelay = 2000;
    
    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullOriginalText.length) {
          setOriginalText(fullOriginalText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 120); 

      return () => clearInterval(interval);
    }, startDelay);
  }, []);

  return (
    <header id="home" className="header-fullpage">
      <div className='bottle-container'>
        <img
          ref={bottleRef}
          src={Images.vinzFlasche}
          alt='Bottle of vinzOriginal'
          className='animated-bottle'
        />
      </div>

      <div className='ingredients-container'>
        {/* Right side ingredients */}
        <img
          src={Images.Apfelessig}
          alt="Ingredients Apfelessig"
          className="apfelessig"

        />
        <img
          src={Images.Honig}
          alt='Ingredients Honig'
          className='honig'

        />

        {/* Left side ingredients */}
        <img
          src={Images.Ingwer}
          alt='Ingredients Ingwer'
          className='ingwer'

        />
        <img
          src={Images.Zitrone}
          alt='Ingredients Zitrone'
          className='zitrone'

        />
        <img
          src={Images.Minze}
          alt='Ingredients Minze'
          className='minze'

        />
      </div>

      <div className='blauer-bogen-container'>
        <img
          ref={blauerBogenRef}
          src={Images.BlauerBogen}
          alt='Blauer Bogen'
          className='blauer-bogen'
        />
      </div>

      <div className='oranger-punkt-container'>
        <img
          ref={orangerPunktRef}
          src={Images.OrangerPunkt} 
          alt='Oranger Punkt'
          className='oranger-punkt'
        />
      </div>

      <div className="header-text-content">
        <h1 className='vinz'>{vinzText}</h1>
      </div>
      <div className='header-text-content2'>
        <h1 className='original'>{originalText}</h1>
      </div>

    </header>
  );
};

export default Header;