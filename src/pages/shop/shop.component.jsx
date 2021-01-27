import React from 'react'

import { Route } from 'react-router-dom'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../collection/collection.container';

import { connect } from 'react-redux';


class ShopPage extends React.Component {
    
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render(){
        const { match } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}></Route>
                <Route path={`${match.path}/:collectionId`} component={CollectionContainer}></Route>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
 fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage)
