import { UPDATE_SETTING, SET_SETTING } from '../actions/settings';

const initialState = {
  cardSize: "Medium",
  voice: "Fred",
  pitch: "1",
  rate: "1",
  silentMode: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return {
        cardSize: action.settingData.cardSize,
        voice: action.settingData.voice,
        pitch: action.settingData.pitch,
        rate: action.settingData.rate,
        silentMode: action.settingData.silentMode
      };
    default:
      return state;
  }
 
};