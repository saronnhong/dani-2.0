import Word from "../../models/words";
export const DELETE_WORD = 'DELETE_WORD';
export const CREATE_WORD = 'CREATE_WORD';
export const UPDATE_WORD = 'UPDATE_WORD';
export const SET_WORDS = 'SET_WORDS';

export const fetchWords = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`https://speechboard-api.herokuapp.com/words/`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      const loadedWords = [];

      for (const key in resData) {
        loadedWords.push(new Word(
          resData[key]._id,
          resData[key].categoryId,
          resData[key].word,
          resData[key].imageUrl,
          resData[key].phonetic,
          resData[key].ownerId
        ));
      }
      dispatch({
        type: SET_WORDS,
        userWords: loadedWords.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export const createWord = (categoryId, word, imageUrl, phonetic) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    const userId = getState().auth.userId;
    //any async code you want!
    const response = await fetch(
      `https://speechboard-api.herokuapp.com/words/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryId,
          word,
          imageUrl,
          phonetic,
          ownerId: userId
        })
      });

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_WORD,
      wordData: {
        _id: resData._id,
        categoryId,
        word,
        imageUrl,
        phonetic,
        ownerId: userId
      }
    });
  };
};
export const deleteWord = wordId => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    const response = await fetch(
      `https://speechboard-api.herokuapp.com/words/${wordId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({ type: DELETE_WORD, wid: wordId });
  }
};
export const updateWord = (id, categoryId, word, imageUrl, phonetic) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // const token = getState().auth.token;
    const response = await fetch(
      `https://speechboard-api.herokuapp.com/words/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          categoryId: categoryId,
          word: word,
          imageUrl: imageUrl,
          phonetic: phonetic,
          ownerId: userId
        })
      });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_WORD,
      wid: id,
      wordData: {
        _id: id,
        categoryId: categoryId,
        word: word,
        imageUrl: imageUrl,
        phonetic: phonetic,
        ownerId: userId
      }
    });
  }

};
