import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_hriScSFXVjPkZnlpTf2ux9NU00ovAcaxzR';

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
        currency="MYR" 
        billingAddress={false} 
        label='Pay Now' 
        name='Toby Paul Test' 
        shippingAddress 
        description={`Your total is RM${price}`}
        panelLabel='Pay Now'
        token={onToken}
        amount={priceForStripe}
        stripeKey={publishableKey}
    />
    )
}

export default StripeCheckoutButton