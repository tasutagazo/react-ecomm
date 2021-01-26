import React from 'react'
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'
import { Route } from 'react-router-dom'
import { firestore, convertCollectionsSnapshotToMap } from '../../config/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import  WithSpinner  from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    
    state = {
        loading: true
    };
    
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections')
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap)
            this.setState({
                loading: false
            })

        })
    }

    render(){
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> }></Route>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props}/>}></Route>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
