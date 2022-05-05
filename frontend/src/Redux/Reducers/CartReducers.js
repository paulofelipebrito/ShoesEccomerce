/* eslint-disable no-fallthrough */
import {CART_REMOVE_ITEM, CART_ADD_ITEM} from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((cart) => cart.product === item.product);

      if(existItem) {
        return{
          ...state,
          cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case CART_REMOVE_ITEM:
        return{
          ...state,
          cartItems: state.cartItems.filter((item) => item.product !== action.payload)
        }
      default:
        return state;
  }
}