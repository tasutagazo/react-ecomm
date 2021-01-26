import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = (state) => state.shop;

export const selectShopSelector = createSelector(
    [selectShop],
    (state) => {
        return state
    }
)
export const selectCollectionsForPreview = createSelector(
    [selectShop],
    (shop) => Object.keys(shop.collections).map(key => shop.collections[key])
)
export const selectCollectionSelector = memoize((collectionUrlParam) => createSelector(
    [selectShop],
    (shop) => shop.collections[collectionUrlParam]
))