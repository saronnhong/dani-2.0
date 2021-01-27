export const UPDATE_WORD_COUNT = 'UPDATE_WORD_COUNT';
export const UPDATE_SENTENCE_COUNT = 'UPDATE_SENTENCE_COUNT';
export const CREATE_ANALYTIC = 'CREATE_ANALYTIC';
export const SET_ANALYTICS = 'SET_ANALYTICS'

export const updateCount = (newWordCount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let currentWordCount = getState().count.wordCount;
    console.log("currentWord: ");
    console.log(currentWordCount)
    let currentSentenceCount = getState().count.sentenceCount;
    console.log("currentSentence: ");
    console.log(currentSentenceCount);

    for (let word in newWordCount) {
      if (!currentWordCount[word]) {
        currentWordCount[word] = 1;
      }
      else {
        currentWordCount[word]++;
      }
    }

    const response = await fetch(
      `https://speechboard-api.herokuapp.com/analytics/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: currentWordCount,
          sentence: currentSentenceCount
        })
      });

    dispatch({
      type: UPDATE_WORD_COUNT,
      updatedWordCount: currentWordCount
    });
  }

};
export const updateSentenceCount = (newSentenceCount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let currentWordCount = getState().count.wordCount;
    let currentSentenceCount = getState().count.sentenceCount;

    for (let word in newSentenceCount) {
      if (!currentSentenceCount[word]) {
        currentSentenceCount[word] = 1;
      }
      else {
        currentSentenceCount[word]++;
      }
    }

    const response = await fetch(
      `https://speechboard-api.herokuapp.com/analytics/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: currentWordCount,
          sentence: currentSentenceCount
        })
      });

    dispatch({
      type: UPDATE_SENTENCE_COUNT,
      updatedSentenceCount: currentSentenceCount
    });
  }
};

export const createAnalytics = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      'https://speechboard-api.herokuapp.com/analytics/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: {},
          sentence: {},
          userId: userId,

        })
      });
    const resData = await response.json();
    // console.log(resData);
    // dispatch({
    //   type: CREATE_ANALYTIC,
    //   analyticsData: {
    //     word: {},
    //     sentence: {},
    //     userId: userId
    //   }
    // });
  };
};

export const fetchAnalytics = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {

      const response = await fetch(`https://speechboard-api.herokuapp.com/analytics/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      console.log("results from fetch analytics: ")
      console.log(resData);

      dispatch({
        type: SET_ANALYTICS,
        analyticsData: {
          word: resData.word,
          sentence: resData.sentence,
          userId: userId
        }
      });
    } catch (err) {
      throw err;
    }
  }
}