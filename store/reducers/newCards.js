import WORDS from '../../data/words';
import { CREATE_WORD, SET_WORDS, DELETE_WORD, UPDATE_WORD } from '../actions/newCards';
import Word from '../../models/words';

const initialState = {
  userWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        userWords: action.userWords
      };
    case CREATE_WORD:
      const newWord = new Word(
        action.wordData.id,
        action.wordData.categoryId,
        action.wordData.word,
        action.wordData.imageUrl,
        action.wordData.phonetic,
        action.wordData.ownerId,
      );
      return {
        ...state,
        userWords: state.userWords.concat(newWord)
      };
    case UPDATE_WORD:
      const wordIndex = state.userWords.findIndex(
        prod => prod.id === action.wid
      );
      const updatedWord = new Word(
        action.wordData.id,
        action.wordData.categoryId,
        action.wordData.word,
        action.wordData.imageUrl,
        action.wordData.phonetic,
        action.wordData.ownerId,
      );
      const updatedUserWords = [...state.userWords];
      updatedUserWords[wordIndex] = updatedWord;
      return {
        ...state,
        userWords: updatedUserWords
      };
    case DELETE_WORD:
      return {
        ...state,
        userWords: state.userWords.filter(
          word => word.id !== action.wid
        )
      };
  }
  return state;
};
