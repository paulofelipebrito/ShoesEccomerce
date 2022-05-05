import {CART_REMOVE_ITEM, CART_ADD_ITEM} from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItem.find((cart) => cart.product === item.product);

      if(existItem) {
        return{
          ...state,
          cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        };
      }
      case CART_REMOVE_ITEM:

      default:
        return state;
  }
}