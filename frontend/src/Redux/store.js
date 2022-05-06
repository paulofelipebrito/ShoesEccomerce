import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productCreateReviewReducer, productDetailsReducer, productListReducer } from './Reducers/ProductReducers';
import {cartReducer} from './Reducers/CartReducers';
import { registerReducer, userDetailsReducer, userLoginReducer, userUpdateProfileReducer } from './Reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './Reducers/OrderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails : productDetailsReducer,
  productCreateReview: productCreateReviewReducer,
  cart : cartReducer,
  userLogin: userLoginReducer,
  userRegister: registerReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

//LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null;

//SHIPING ADDRESS
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") 
  ? JSON.parse(localStorage.getItem('shippingAddress')) 
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage
  },
  userLogin: {userInfo: userInfoFromLocalStorage}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;