import {cartConfig} from './cart.types';

export const toggleCartHidden = () => ({
    type: cartConfig.TOGGLE_CART_HIDDEN
});

export const reduceItem = (item) => {
    return {
        type: cartConfig.REDUCE_ITEM,
        payload: item
    }
}

export const addItem = (item) => {
    return  {
        type: cartConfig.ADD_ITEM,
        payload: item
    }
}

export const clearItemFromCart = (item) => {
    return {
        type: cartConfig.CLEAR_ITEM_FROM_CART,
        payload: item
    }
}

export const clearCart = () => ({
    type: cartConfig.CLEAR_CART
})
