import { takeLatest, put, all, call } from 'redux-saga/effects';
import { userConfig } from '../user/user.types';
import { clearCart } from '../cart/cart.actions'


export function* clearCartOnSignout(){
    yield put(clearCart());
}

// Clear cart sagas
export function* onSignOutSuccess(){
    yield takeLatest(userConfig.SIGN_OUT_SUCCESS, clearCartOnSignout)
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)])
}