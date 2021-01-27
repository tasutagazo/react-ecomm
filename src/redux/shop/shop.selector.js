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
    (shop) => shop.collections ? Object.keys(shop.collections).map(key => shop.collections[key]) : []
)

export const selectCollectionSelector = memoize((collectionUrlParam) => createSelector(
    [selectShop],
    (shop) => shop.collections ? shop.collections[collectionUrlParam] : null
))

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
)

// Checks if collcetions is already loaded

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
)