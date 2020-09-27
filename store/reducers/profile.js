import { UPDATE_PROFILE, CREATE_PROFILE, SET_PROFILE} from '../actions/profile';
import Profile from '../../models/profile';



const initialState = {
  name: null,
  age: null,
  imageURL: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: 
    return {
      name: action.profileData.name,
      age: action.profileData.age,
      imageUrl: action.profileData.imageUrl
    };
    case UPDATE_PROFILE:
      return {
          name: action.profileData.name,
          age: action.profileData.age,
          imageUrl: action.profileData.imageUrl
      };
    case CREATE_PROFILE:
      // const newProfile = new Profile(
      //   action.profileData.name,
      //   action.profileData.age,
      //   action.profileData.imageUrl,
      //   action.profileData.ownerId,
      // );
      return {
        name: action.profileData.name,
        age: action.profileData.age,
        imageUrl: action.profileData.imageUrl
      }

    default:
      return state;
  }

};

