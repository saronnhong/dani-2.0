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
    
      dispatch({
        type: SET_SETTING,
        userSetting: resData
      });
    } catch (err) {
      throw err;
    }
  }
}


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
