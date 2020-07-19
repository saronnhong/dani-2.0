import Word from "../../models/words";
export const DELETE_WORD = 'DELETE_WORD';
export const CREATE_WORD = 'CREATE_WORD';
// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_WORDS = 'SET_WORDS';

export const fetchWords = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      //any async code you want!
      
      const response = await fetch('https://dani-2.firebaseio.com/words.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      
      const loadedWords = [];
 
      for (const key in resData) {
        loadedWords.push(new Word(
          key,
          resData[key].categoryId,
          resData[key].word,
          resData[key].imageUrl,
          resData[key].phonetic,
          resData[key].color,
          resData[key].voiceRecord,
          resData[key].ownerId
        ));
      }
      dispatch({
        type: SET_WORDS,
        // words: loadedWords,
        userWords: loadedWords
      });
    } catch (err) {
      throw err;
    }
  }
}

export const createWord = (categoryId, word, imageUrl, phonetic, color, voiceRecord) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //any async code you want!
    const response = await fetch(
      `https://dani-2.firebaseio.com/words.json?auth=${token}`,
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
          color,
          voiceRecord,
          ownerId: userId
        })
      });

    const resData = await response.json();

    dispatch({
      type: CREATE_WORD,
      wordData: {
        id: resData.name,
        categoryId,
        word,
        imageUrl,
        phonetic,
        color,
        voiceRecord,
        ownerId: userId
      }
    });
  };
};
export const deleteWord = wordId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://dani-2.firebaseio.com/words/${wordId}.json?auth=${token}`,
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
// export const updateProduct = (id, title, description, imageUrl) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://myshop-5025e.firebaseio.com/products/${id}.json?auth=${token}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           imageUrl
//         })
//       });

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }

//     dispatch({
//       type: UPDATE_PRODUCT,
//       pid: id,
//       productData: {
//         title,
//         description,
//         imageUrl,
//       }
//     });
//   }

// };
