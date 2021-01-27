import { UPDATE_WORD_COUNT, UPDATE_SENTENCE_COUNT, SET_ANALYTICS } from '../actions/count';


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
    // case CREATE_ANALYTIC:
    //   return {
    //     ...state,
    //     wordCount: action.analyticsData.word,
    //     sentenceCount: action.analyticsData.sentence
    //   };
    case SET_ANALYTICS:
      return {
        wordCount: action.analyticsData.word,
        sentenceCount: action.analyticsData.sentence
        // wordCount: {
        //   "chat": 100
        // },
        // sentenceCount: {
        //   "hello from the galaxy": 300
        // }
      };
    default:
      return state;
  }
};
