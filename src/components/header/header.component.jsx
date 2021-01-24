import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component';
import { auth } from '../../config/firebase.utils';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionHeaderDiv, OptionHeaderLink } from './header.styles';

const Header = ({ currentUser, cart }) => (
    <HeaderContainer>
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
                <OptionHeaderDiv onClick={() => auth.signOut()}>SIGN OUT</OptionHeaderDiv> :
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cart: selectCartHidden
})

export default connect(mapStateToProps)(Header)
