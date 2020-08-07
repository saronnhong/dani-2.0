export const UPDATE_SETTING = 'UPDATE_SETTING';

export const updateSettings = (cardSize, voice, pitch, rate, silentMode) => {
    return async dispatch => {

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