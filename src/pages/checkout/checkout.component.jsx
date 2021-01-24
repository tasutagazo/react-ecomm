import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';


const CheckoutPage = ({cartItems, cartTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                Product
            </div>
            <div className='header-block'>
                Description
            </div>
            <div className='header-block'>
                Quantity
            </div>
            <div className='header-block'>
                Price
            </div>
            <div className='header-block'>
                Remove
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className='total'>
            <span>Total: RM{cartTotal}</span>
        </div>
        <div className='test-warning'>
            *Please use the following test card for payments 
            <br />
            4242 4242 4242 4242 - Exp: Any Future Date - CVV: Any
        </div>
        <StripeCheckoutButton price={cartTotal}/>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
});



export default connect(mapStateToProps)(CheckoutPage)