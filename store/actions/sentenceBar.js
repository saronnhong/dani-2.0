export const ADD_TO_BAR = 'ADD_TO_BAR';
export const REMOVE_FROM_BAR = 'REMOVE_FROM_BAR';

export const addToBar = word => {
  return { type: ADD_TO_BAR, word: word };
};

export const removeFromBar = () => {
  return { type: REMOVE_FROM_BAR };
};

