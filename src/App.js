import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import Checkout from './pages/checkout/checkout.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';

import { auth, createUserProfileDocument } from './config/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect'

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            }
          )
        })
      } 
      setCurrentUser(userAuth);
      

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect /> ) : (<SignInAndSignUpPage />)} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispathToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispathToProps)(App);
