export const UPDATE_SETTING = 'UPDATE_SETTING';
export const SET_SETTING = 'SET_SETTING'

export const updateSettings = (cardSize, voice, pitch, rate, silentMode) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const userEmail = getState().profile.email;

        const response = await fetch(
            `https://speechboard-api.herokuapp.com/profiles/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardSize,
                    voice,
                    pitch,
                    rate,
                    silentMode
                })
            });

        dispatch({
            type: UPDATE_SETTING,
            settingData: {
                cardSize: cardSize,
                voice: voice,
                pitch: pitch,
                rate: rate,
                silentMode: silentMode
            }
        });
    }
};


export const fetchSettings = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {

            const response = await
                fetch(`https://speechboard-api.herokuapp.com/profiles/${userId}`
            {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

            if (!response.ok) {
                throw new Error('Something went wrong')
            }


            const resData = await response.json();
            console.log("from the fetch here: ")
            console.log(resData);

            dispatch({
                type: SET_SETTINGS,
                settingsData: {
                    cardSize: resData.cardSize,
                    voice: resData.voice,
                    pitch: resData.pitch,
                    rate: resData.rate,
                    silentMode: resData.silentMode
                }
            });

        } catch (err) {
            throw err;
        }
    }


}