// import Word from "../../models/words";
// export const DELETE_WORD = 'DELETE_WORD';
// export const CREATE_WORD = 'CREATE_WORD';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const SET_SETTING = 'SET_SETTING';

export const fetchSettings = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      //any async code you want!

      const response = await fetch(`https://dani-2.firebaseio.com/settings/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
    //   console.log(resData);

    //   const loadedWords = [];

    //   for (const key in resData) {
    //     loadedWords.push(new Word(
    //       key,
    //       resData[key].categoryId,
    //       resData[key].word,
    //       resData[key].imageUrl,
    //       resData[key].phonetic,
    //       resData[key].ownerId
    //     ));
    //   }
      dispatch({
        type: SET_SETTING,
        // words: loadedWords,
        userSetting: resData
      });
    } catch (err) {
      throw err;
    }
  }
}

// export const createWord = (categoryId, word, imageUrl, phonetic, color, voiceRecord) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     //any async code you want!
//     const response = await fetch(
//       `https://dani-2.firebaseio.com/words.json?auth=${token}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           categoryId,
//           word,
//           imageUrl,
//           phonetic,
//           // color,
//           // voiceRecord,
//           ownerId: userId
//         })
//       });

//     const resData = await response.json();

//     dispatch({
//       type: CREATE_WORD,
//       wordData: {
//         id: resData.name,
//         categoryId,
//         word,
//         imageUrl,
//         phonetic,
//         // color,
//         // voiceRecord,
//         ownerId: userId
//       }
//     });
//   };
// };
// export const deleteWord = wordId => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://dani-2.firebaseio.com/words/${wordId}.json?auth=${token}`,
//       {
//         method: 'DELETE',
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }

//     dispatch({ type: DELETE_WORD, wid: wordId });
//   }
// };
export const updateSettings = (cardSize, voice, pitch, rate) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const response = await fetch(
            `https://dani-2.firebaseio.com/settings/${userId}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardSize: cardSize,
                    voice: voice,
                    pitch: pitch,
                    rate: rate,
                    ownerId: userId
                })
            });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_SETTING,
            settingData: {
                cardSize: cardSize,
                voice: voice,
                pitch: pitch,
                rate: rate,
                ownerId: userId
            }
        });
    }

};
