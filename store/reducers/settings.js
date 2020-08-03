import { UPDATE_SETTING, SET_SETTING } from '../actions/settings';

const initialState = {
  cardSize: null,
  voice: null,
  pitch: null,
  rate: null,
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
  }
  return state;
};