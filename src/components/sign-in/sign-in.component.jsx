import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../config/firebase.utils';

import './sign-in.styles.scss';

export class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        await auth.signInWithEmailAndPassword(email, password)
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput name='email' type="email" label="email" handleChange={this.handleChange} value={this.state.email} required/>
                   
                    <FormInput name='password' type="password" label="password" handleChange={this.handleChange} value={this.state.password} required/>
                
                    <div className="buttons">
                    <CustomButton type="submit">Submit Form</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                 
                </form>
                
            </div>
        )
    }
}

export default SignIn
