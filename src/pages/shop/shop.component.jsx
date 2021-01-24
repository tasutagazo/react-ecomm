import React from 'react'
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'
import { Route } from 'react-router-dom'

const ShopPage = ({ match }) => {
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={ CollectionOverview }></Route>
                <Route path={`${match.path}/:collectionId`} component={ CollectionPage }></Route>
            </div>
        )
}



export default ShopPage
