import WORDS from '../../data/words';
import { CREATE_WORD } from '../actions/newCards';
import Word from '../../models/words';

const initialState = {
  availableWords: [],
  userWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        availableWords: action.words,
        userWords: action.userWords
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    // case UPDATE_PRODUCT:
    //   const productIndex = state.userProducts.findIndex(
    //     prod => prod.id === action.pid
    //   );
    //   const updatedProduct = new Product(
    //     action.pid,
    //     state.userProducts[productIndex].ownerId,
    //     action.productData.title,
    //     action.productData.imageUrl,
    //     action.productData.description,
    //     state.userProducts[productIndex].price
    //   );
    //   const updatedUserProducts = [...state.userProducts];
    //   updatedUserProducts[productIndex] = updatedProduct;
    //   const availableProductIndex = state.availableProducts.findIndex(
    //     prod => prod.id === action.pid
    //   );
    //   const updatedAvailableProducts = [...state.availableProducts];
    //   updatedAvailableProducts[availableProductIndex] = updatedProduct;
    //   return {
    //     ...state,
    //     availableProducts: updatedAvailableProducts,
    //     userProducts: updatedUserProducts
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     userProducts: state.userProducts.filter(
    //       product => product.id !== action.pid
    //     ),
    //     availableProducts: state.availableProducts.filter(
    //       product => product.id !== action.pid
    //     )
    //   };
  }
  return state;
};
