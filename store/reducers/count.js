import { UPDATE_COUNT } from '../actions/count';


const initialState = {
  wordCount: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COUNT:
      return {
        // ...state,
        wordCount: action.updatedWordCount
      };
    default:
      return state;
  }
};
