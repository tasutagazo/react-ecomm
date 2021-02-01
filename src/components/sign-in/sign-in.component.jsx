import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { GoogleSignInStart, EmailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';
import './sign-in.styles.scss';

const SignIn = ({ EmailSignInStart, GoogleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        
        EmailSignInStart(email, password)

    }

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name]: value })
    }
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>

                    <FormInput name='email' type="email" label="email" handleChange={handleChange} value={email} required/>
                   
                    <FormInput name='password' type="password" label="password" handleChange={handleChange} value={password} required/>
                
                    <div className="buttons">
                    <CustomButton type="submit">Submit Form</CustomButton>
                    <CustomButton type="button" onClick={GoogleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                 
                </form>
                
            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    GoogleSignInStart: () => dispatch(GoogleSignInStart()),
    EmailSignInStart: (email, password) => dispatch(EmailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
