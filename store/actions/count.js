export const UPDATE_COUNT = 'UPDATE_COUNT';

export const updateCount = (wordCount) => {
  return async (dispatch, getState) => {

    const stateCount = getState().count.wordCount
    console.log(stateCount)

    for (const word in wordCount) {
        if(!stateCount[word]){
            stateCount[word] = 1
        }
        else if(stateCount[word]){
            stateCount[word]++
        }
      }

    dispatch({
      type: UPDATE_COUNT,
      updatedWordCount: stateCount
    });
  }

};