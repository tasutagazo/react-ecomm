import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux'
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({email: '', displayName: '', password: '', confirmPassword: ''})
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if(password !== confirmPassword){
            return alert('Password don\'t match')
        }

        try {
            const userPayload = { displayName, email, password, confirmPassword };
            signUpStart(userPayload)
        }catch(e){}
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials, [name]: value})
    }

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have ann account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className='sign-up-form'>
                <FormInput name="displayName" type="text" value={displayName} onChange={handleChange} label='Display Name' required />
                <FormInput name="email" type="email" value={email} onChange={handleChange} label='Email' required />
                <FormInput name="password" type="password" value={password} onChange={handleChange} label='Password' required />
                <FormInput name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} label='Confirm Password' required />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    signUpStart: (payload) => dispatch(signUpStart(payload))
})

export default connect(null, mapDispatchToProps)(SignUp)