import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, GoogleProvider, createUserProfileDocument, getCurrentUser } from '../../config/firebase.utils';
import { userConfig } from './user.types';
import {
    SignInFailure,
    SignInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpSuccess,
    signUpFail
} from './user.actions';

export function* getSnapshotFromUserAuth(userAuth){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
   
    }catch(e){
        yield put(SignInFailure(e.message));
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user)
    }catch(e){
        yield put(SignInFailure(e.message))
    }
}

export function *signInWithEmail({payload: {email, password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch(e){
        yield put(SignInFailure(e.message))
    }

}

export function *isUserAuthenticated(){
    try{
        const userAuth  = yield getCurrentUser();
        if(!userAuth){
            return;
        };
        yield getSnapshotFromUserAuth(userAuth)
    } catch(e){
        yield put(SignInFailure(e.message))
    }
}

export function* signOutUser(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(e){
        yield put(signOutFailure(e.message))
    }
}

export function* signUpUser({ payload: {email, password, displayName}}){
    try{
        const { user }  = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {
            displayName
        }}))
    }catch(e){
        yield put(signUpFail(e.message))
    }
}

export function* signInAfterSignUp({ payload: {user, additionalData}}){
    const documentQueryReference = yield createUserProfileDocument(user, { displayName: additionalData.displayName })
    // Log user in here 
    const documentSnapshot = yield documentQueryReference.get();

    yield put(SignInSuccess({id: documentSnapshot.id, ...documentSnapshot.data()}))

}

export function* onEmailSignInStart(){
    yield takeLatest(userConfig.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart(){
    yield takeLatest(userConfig.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession(){
    yield takeLatest(userConfig.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onUserSignOut(){
    yield takeLatest(userConfig.SIGN_OUT_START, signOutUser)
}

export function* onSignUpStart(){
    yield takeLatest(userConfig.SIGN_UP_START, signUpUser)
}

export function* onSignUpSuccess(){
    yield takeLatest(userConfig.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onUserSignOut), call(onSignUpStart), call(onSignUpSuccess)])
}