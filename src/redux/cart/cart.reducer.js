import { cartConfig } from './cart.types';
import { addItemToCart, removeItemFromCart, reduceItemInCart } from './cart.utils';
const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartConfig.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartConfig.ADD_ITEM: 
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case cartConfig.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case cartConfig.REDUCE_ITEM:
            return {
                ...state,
                cartItems: reduceItemInCart(state.cartItems, action.payload)
            }
        case cartConfig.CLEAR_CART: 
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}

export default cartReducer;