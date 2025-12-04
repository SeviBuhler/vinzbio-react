import Images from '../images/imageImport.js';

export const INGREDIENT_CONFIG = [
  {
    id: 'apfelessig',
    src: Images.Apfelessig,
    alt: 'Ingredients Apfelessig',
    positions: {
      initial: { transform: 'translate(-50%, -50%) rotate(-15deg)', opacity: '0' },
      animated: { transform: 'translate(calc(var(--vw) * 3), calc(var(--vh) * -20)) rotate(20deg)', opacity: '1' }
    }
  },
  {
    id: 'honig',
    src: Images.Honig,
    alt: 'Ingredients Honig',
    positions: {
      initial: { transform: 'translate(-50%, -50%) rotate(-20deg)', opacity: '0' },
      animated: { transform: 'translate(calc(var(--vw) * 3), calc(var(--vh) * 5)) rotate(20deg)', opacity: '1' }
    }
  },
  {
    id: 'ingwer',
    src: Images.Ingwer,
    alt: 'Ingredients Ingwer',
    positions: {
      initial: { transform: 'translate(-50%, -50%) rotate(15deg)', opacity: '0' },
      animated: { transform: 'translate(calc(var(--vw) * -12), calc(var(--vh) * 6)) rotate(5deg)', opacity: '1' }
    }
  },
  {
    id: 'zitrone',
    src: Images.Zitrone,
    alt: 'Ingredients Zitrone',
    positions: {
      initial: { transform: 'translate(-50%, -50%) rotate(45deg)', opacity: '0' },
      animated: { transform: 'translate(calc(var(--vw) * -12), calc(var(--vh) * -10)) rotate(15deg)', opacity: '1' }
    }
  },
  {
    id: 'minze',
    src: Images.Minze,
    alt: 'Ingredients Minze',
    positions: {
      initial: { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: '0' },
      animated: { transform: 'translate(calc(var(--vw) * -12), calc(var(--vh) * 20)) rotate(-20deg)', opacity: '1' }
    }
  }
];

export const getIngredientPositions = () => {
  return INGREDIENT_CONFIG.reduce((acc, ingredient) => {
    acc[ingredient.id] = ingredient.positions;
    return acc;
  }, {});
};