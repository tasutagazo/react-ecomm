import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../config/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = error => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAIL,
    payload: error
})

export const fetchCollectionsStartAsync = () => {

    return dispatch => {

        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(async snapshot => {

            const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap))

        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

    }

}