import wordItem from '../../models/words';
import { ADD_TO_BAR, REMOVE_FROM_BAR } from '../actions/sentenceBar';

const initialState = {
    words: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BAR:
            const addedWord = action.word;

            let updatedOrNewSentenceItem;
            updatedOrNewSentenceItem = new wordItem(addedWord.id, addedWord.categoryId, addedWord.word, addedWord.imageUrl, addedWord.phonetic);
            return {
                ...state,
                words: state.words.concat(updatedOrNewSentenceItem)
            };
        case REMOVE_FROM_BAR:
            state.words.pop();

            return {
                ...state,
                words: state.words
            }
            
        default:
            return state;
    }
}