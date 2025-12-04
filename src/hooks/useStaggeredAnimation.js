import { useState, useEffect } from 'react';

/**
 * Hook für gestaffelte Animationen mit IntersectionObserver
 * @param {string} targetId - ID des zu beobachtenden Elements
 * @param {boolean} allowAnimation - Flag ob Animation erlaubt ist
 * @param {number} delay - Verzögerung vor Start (ms)
 * @param {number} threshold - IntersectionObserver threshold
 * @returns {[boolean, boolean]} [animationStarted, hasAnimated]
 */
export const useStaggeredAnimation = (
  targetId, 
  allowAnimation = true, 
  delay = 400, 
  threshold = 0.3
) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!allowAnimation || hasAnimated) {
      if (hasAnimated) {
        setAnimationStarted(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setAnimationStarted(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold }
    );

    const target = document.getElementById(targetId);
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetId, allowAnimation, hasAnimated, delay, threshold]);

  return [animationStarted, hasAnimated];
};