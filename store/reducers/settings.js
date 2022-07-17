import { UPDATE_SETTING, CREATE_SETTING, SET_SETTING } from '../actions/settings';

const initialState = {
  cardSize: null,
  voice: null,
  pitch: null,
  rate: null,
  silentMode: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return {
        cardSize: action.settingsData.cardSize,
        voice: action.settingsData.voice,
        pitch: action.settingsData.pitch,
        rate: action.settingsData.rate,
        silentMode: action.settingsData.silentMode,
        userId: action.settingsData.userId
      };
    case CREATE_SETTING:
      return {
        cardSize: action.settingsData.cardSize,
        voice: action.settingsData.voice,
        pitch: action.settingsData.pitch,
        rate: action.settingsData.rate,
        silentMode: action.settingsData.silentMode,
        userId: action.settingsData.userId
      }
    case SET_SETTING:
        return {
          cardSize: action.settingsData.cardSize,
          voice: action.settingsData.voice,
          pitch: action.settingsData.pitch,
          rate: action.settingsData.rate,
          silentMode: action.settingsData.silentMode,
          userId: action.settingsData.userId
        }
      
    default:
      return state;
  }
 
};