import { UPDATE_COUNT, UPDATE_SENTENCE_COUNT } from '../actions/count';


const initialState = {
  wordCount: {},
  sentenceCount: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COUNT:
      return {
        ...state,
        wordCount: action.updatedWordCount
      };
    case UPDATE_SENTENCE_COUNT:
      return {
        ...state,
        sentenceCount: action.updatedSentenceCount
      };
    default:
      return state;
  }
};
