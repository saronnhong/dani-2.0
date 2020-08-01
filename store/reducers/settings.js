import { UPDATE_SETTING, SET_SETTING } from '../actions/settings';

const initialState = {
  userSetting: {cardSize: 'Small', voice: 'Nicky', pitch: '1', rate: '1'}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      return {
        userSetting: action.userSetting
      };
    case UPDATE_SETTING:
      return {
        userSetting: action.settingData
      };
  }
  return state;
};
