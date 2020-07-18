import WORDS from '../../data/words';
import { CREATE_WORD, SET_WORDS, DELETE_WORD } from '../actions/newCards';
import Word from '../../models/words';

const initialState = {
  // availableWords: [],
  userWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        // availableWords: action.words,
        userWords: action.userWords
      };
    case CREATE_WORD:
      const newWord = new Word(
        action.wordData.id,
        action.wordData.categoryId,
        action.wordData.word,
        action.wordData.imageUrl,
        action.wordData.phonetic,
        action.wordData.color,
        action.wordData.voiceRecord,
        action.wordData.ownerId,
      );
      return {
        ...state,
        // availableWords: state.availableWords.concat(newWord),
        userWords: state.userWords.concat(newWord)
      };
    // case UPDATE_PRODUCT:
    //   const productIndex = state.userProducts.findIndex(
    //     prod => prod.id === action.pid
    //   );
    //   const updatedProduct = new Product(
    //     action.pid,
    //     state.userProducts[productIndex].ownerId,
    //     action.productData.title,
    //     action.productData.imageUrl,
    //     action.productData.description,
    //     state.userProducts[productIndex].price
    //   );
    //   const updatedUserProducts = [...state.userProducts];
    //   updatedUserProducts[productIndex] = updatedProduct;
    //   const availableProductIndex = state.availableProducts.findIndex(
    //     prod => prod.id === action.pid
    //   );
    //   const updatedAvailableProducts = [...state.availableProducts];
    //   updatedAvailableProducts[availableProductIndex] = updatedProduct;
    //   return {
    //     ...state,
    //     availableProducts: updatedAvailableProducts,
    //     userProducts: updatedUserProducts
    //   };
    case DELETE_WORD:
      return {
        ...state,
        userWords: state.userWords.filter(
          word => word.id !== action.wid
        )
        // availableWords: state.availableWords.filter(
        //   word => word.id !== action.wid
        // )
      };
  }
  return state;
};
