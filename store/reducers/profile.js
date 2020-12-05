import { UPDATE_PROFILE, CREATE_PROFILE } from '../actions/profile';


const initialState = {
  email: null,
  name: null,
  age: null,
  dateOfBirth: null,
  imageUrl: null,
  coverImageUrl: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        name: action.profileData.name,
        age: action.profileData.age,
        dateOfBirth: action.profileData.dateOfBirth,
        imageUrl: action.profileData.imageUrl,
        coverImageUrl: action.profileData.coverImageUrl
      };
    case CREATE_PROFILE:
      return {
        ...state,
        email: action.profileData.email,
        userId: action.profileData.userId
      }

    default:
      return state;
  }

};

