import { CREATE_PROFILE } from '../actions/profile';
import Profile from '../../models/profile';



const initialState = {
    profileInfo: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
    //   case SET_WORDS:
    //     return {
    //       userWords: action.userWords
    //     };
      case CREATE_PROFILE:
        const newProfile = new Profile(
          action.profileData.id,
          action.profileData.name,
          action.profileData.age,
          action.profileData.location,
          action.profileData.imageURL,
          action.profileData.dateJoined,
          action.profileData.ownerId,
        );
        return {
          ...state,
          profileInfo: newProfile
        };
    //   case UPDATE_WORD:
    //     const wordIndex = state.userWords.findIndex(
    //       prod => prod.id === action.wid
    //     );
    //     const updatedWord = new Word(
    //       action.wordData.id,
    //       action.wordData.categoryId,
    //       action.wordData.word,
    //       action.wordData.imageUrl,
    //       action.wordData.phonetic,
    //       action.wordData.ownerId,
    //     );
    //     const updatedUserWords = [...state.userWords];
    //     updatedUserWords[wordIndex] = updatedWord;
    //     return {
    //       ...state,
    //       userWords: updatedUserWords
    //     };
    //   case DELETE_WORD:
    //     return {
    //       ...state,
    //       userWords: state.userWords.filter(
    //         word => word.id !== action.wid
    //       )
    //     };
    // }
    return state;
  };
  