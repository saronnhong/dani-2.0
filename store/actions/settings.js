export const UPDATE_SETTING = 'UPDATE_SETTING';
export const SET_SETTING = 'SET_SETTING'

export const updateSettings = (cardSize, voice, pitch, rate, silentMode, userId) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const userEmail = getState().profile.email;

        const response = await fetch(
            `https://speechboard-api.herokuapp.com/settings/${userId}`,
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
                    silentMode,
                    userId
                })
            });

        dispatch({
            type: UPDATE_SETTING,
            settingData: {
                cardSize: cardSize,
                voice: voice,
                pitch: pitch,
                rate: rate,
                silentMode: silentMode,
                userId: userId
            }
        });
    }
};


export const fetchSettings = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {

            const response = await
                fetch(`https://speechboard-api.herokuapp.com/settings/${userId}`,
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
            console.log("from the settings fetch here: ")
            console.log(resData);

            dispatch({
                type: SET_SETTING,
                settingsData: {
                    cardSize: resData.cardSize,
                    voice: resData.voice,
                    pitch: resData.pitch,
                    rate: resData.rate,
                    silentMode: resData.silentMode,
                    userId: userId
                }
            });

        } catch (err) {
            throw err;
        }
    }
}

export const createSettings = (email, name, age, dateOfBirth, imageUrl, coverImageUrl) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch(
            'https://speechboard-api.herokuapp.com/settings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardSize: cardSize,
                    voice: voice,
                    pitch: pitch,
                    rate: rate,
                    silentMode: silentMode,
                    userId: userId

                })
            });
        const resData = await response.json();
        // console.log(resData);
        dispatch({
            type: CREATE_SETTING,
            profileData: {
                cardSize: cardSize,
                voice: voice,
                pitch: pitch,
                rate: rate,
                silentMode: silentMode,
                userId: userId
            }
        });
    };
};