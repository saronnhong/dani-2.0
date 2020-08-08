import { UPDATE_PROFILE } from '../actions/profile';
// import Profile from '../../models/profile';



const initialState = {
  profileInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        profileInfo: {
          name: action.profileData.name,
          age: action.profileData.age,
          imageUrl: action.profileData.imageUrl
        }

      };

    default:
      return state;
  }

};

