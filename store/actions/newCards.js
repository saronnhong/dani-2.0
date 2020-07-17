import Word from "../../models/words";
// export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_WORD = 'CREATE_WORD';
// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
// export const SET_WORDS = 'SET_WORDS';

// export const fetchProducts = () => {
//   return async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     try {
//       //any async code you want!
//       const response = await fetch('https://dani-2.firebaseio.com/user_words.json');

//       if (!response.ok) {
//         throw new Error('Something went wrong');
//       }

//       const resData = await response.json();
//       const loadedWords = [];

//       for (const key in resData) {
//         loadedWords.push(new Product(
//           key,
//           resData[key].id,
//           resData[key].categoryId,
//           resData[key].word,
//           resData[key].imageUrl,
//           resData[key].phonetic,
//           resData[key].ownerId
//         ));
//       }
//       dispatch({
//         type: SET_WORDS,
//         words: loadedWords,
//         userWords: loadedWords.filter(prod => prod.ownerId === userId)
//       });
//     } catch (err) {
//       throw err;
//     }
//   }
// }

// export const deleteProduct = productId => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://myshop-5025e.firebaseio.com/products/${productId}.json?auth=${token}`,
//       {
//         method: 'DELETE',
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }

//     dispatch({ type: DELETE_PRODUCT, pid: productId });
//   }
// };

export const createWord = (categoryId, word, phonetic, voiceRecord, color, imageUrl) => {
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
          // phonetic,
          // voiceRecord,
          // color,
          imageUrl,
          ownerId: userId
        })
      });

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_WORD,
      productData: {
        id: resData.name,
        categoryId,
        word,
        // phonetic,
        // voiceRecord,
        // color,
        imageUrl,
        ownerId: userId
      }
    });
  };
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
