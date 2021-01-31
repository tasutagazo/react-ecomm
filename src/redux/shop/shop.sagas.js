import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../config/firebase.utils';
import ShopActionTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollections() {

    try{

        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))

    }catch(e){
        console.log(e);
        yield put(fetchCollectionsFailure(e.message))
    }

}

export function* onFetchCollectionStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollections
    )
}