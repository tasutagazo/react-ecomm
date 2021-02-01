import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionHeaderDiv, OptionHeaderLink } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions'; 

const Header = ({ currentUser, cart, signOutUser}) => {
        return (<HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionHeaderLink to='/shop'>
                    SHOP
                </OptionHeaderLink>
                <OptionHeaderLink to='/shop'>
                    CONTACT
                </OptionHeaderLink>
                {
                    currentUser?
                    <OptionHeaderDiv onClick={signOutUser}>SIGN OUT</OptionHeaderDiv> :
                    <OptionHeaderLink to='/signin'>SIGN IN</OptionHeaderLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                    cart ? null :
                    <CartDropdown /> 
                    
            }
            
        </HeaderContainer>
    )
}


  

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cart: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
