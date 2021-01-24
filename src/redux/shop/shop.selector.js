import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = (state) => state.collections;

export const selectShopSelector = createSelector(
    [selectShop],
    (state) => {
        return state
    }
)
export const selectCollectionsForPreview = createSelector(
    [selectShop],
    (collections) => Object.keys(collections).map(key => collections[key])
)
export const selectCollectionSelector = memoize((collectionUrlParam) => createSelector(
    [selectShop],
    (collections) => collections[collectionUrlParam]
))