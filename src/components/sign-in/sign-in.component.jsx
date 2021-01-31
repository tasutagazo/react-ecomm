import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { GoogleSignInStart, EmailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';
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
        const { EmailSignInStart } = this.props;
        const { email, password } = this.state;
        EmailSignInStart(email, password)

        this.setState({email: '', password: ''})

    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { GoogleSignInStart } = this.props
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput name='email' type="email" label="email" handleChange={this.handleChange} value={this.state.email} required/>
                   
                    <FormInput name='password' type="password" label="password" handleChange={this.handleChange} value={this.state.password} required/>
                
                    <div className="buttons">
                    <CustomButton type="submit">Submit Form</CustomButton>
                    <CustomButton type="button" onClick={GoogleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                 
                </form>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    GoogleSignInStart: () => dispatch(GoogleSignInStart()),
    EmailSignInStart: (email, password) => dispatch(EmailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
