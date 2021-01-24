import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => {
        return cart.cartItems
    }
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        const itemCount = cartItems.reduce((acumulatedQuantity, cartItem) => acumulatedQuantity + cartItem.quantity, 0)
        return itemCount
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        const cartTotal = cartItems.reduce((acumulatedQuantity, cartItem) => acumulatedQuantity + cartItem.price * cartItem.quantity, 0)
        return cartTotal
    }
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => {
        return cart.hidden
    }
)