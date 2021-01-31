import { UPDATE_WORD_COUNT, UPDATE_SENTENCE_COUNT, SET_ANALYTICS, CREATE_ANALYTICS } from '../actions/count';


const initialState = {
  wordCount: {},
  sentenceCount: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WORD_COUNT:
      return {
        ...state,
        wordCount: action.updatedWordCount
      };
    case UPDATE_SENTENCE_COUNT:
      return {
        ...state,
        sentenceCount: action.updatedSentenceCount
      };
    case CREATE_ANALYTICS:
      return {
        ...state,
        wordCount: {},
        sentenceCount: {}
      };
    case SET_ANALYTICS:
      return {
        ...state,
        wordCount: action.analyticsData.word,
        sentenceCount: action.analyticsData.sentence
      };
    default:
      return state;
  }
};
