import { UPDATE_SETTING, SET_SETTING } from '../actions/settings';

const initialState = {
  userSetting: {}
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
