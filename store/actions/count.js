export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_SENTENCE_COUNT = 'UPDATE_SENTENCE_COUNT';

export const updateCount = (newWordCount) => {
  return async (dispatch, getState) => {
    let stateCount = getState().count.wordCount

    for (let word in newWordCount) {
        if(!stateCount[word]){
            stateCount[word] = 1;
        }
        else {
            stateCount[word]++;
        }
      }
    console.log(stateCount);

    dispatch({
      type: UPDATE_COUNT,
      updatedWordCount: stateCount
    });
  }

};
export const updateSentenceCount = (newSentenceCount) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_SENTENCE_COUNT,
      updatedSentenceCount: newSentenceCount
    });
  }

};