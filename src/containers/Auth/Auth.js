import React, {Component} from 'react';
import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as authActions from '../../store/actions/auth';

class Auth extends Component {

	state = {
    email: '',
    password: '',
    errMsg: ''
  }

	emailHandler = (e) => {
    	this.setState({email: e.target.value})
  	}

    passwordHandler = (e) => {
    	this.setState({password: e.target.value})
  	}


	submitHandler = () => {
		this.props.onAuth(this.state.email, this.state.password, this.props.isAuthenticated);
		this.props.hideModal();
	}


	render(){

		let signInForm = 
			<form>
				<label>E-MAIL</label><br/>
		        <input onChange={(e)=>this.emailHandler(e)} type="text"/><br/>
		        <label>PASSWORD</label><br/>
		        <input onChange={(e)=>this.passwordHandler(e)} type="password"/><br/>
			</form>
		

		let signUpForm = 
			<form>
				<label>E-MAIL</label><br/>
	            <input onChange={(e)=>this.emailHandler(e)} type="text"/><br/>
	            <label>PASSWORD</label><br/>
	            <input onChange={(e)=>this.passwordHandler(e, 'first')} type="password"/><br/>
	            <label>REPEAT PASSWORD</label><br/>
	            <input onChange={(e)=>this.passwordHandler(e, 'second')} type="password"/><br/>
            </form>
		

		return(
	      <div>
	        <div className={classes.formWrapper}>
	          <div className={classes.firstHalf}>
	            <h2 className={classes.formTitle}>{this.props.signIn ? "Sign In" : "Sign Up"}</h2>
	            <p className={classes.description}>With your account you can save your work time.</p>
	            <p className={classes.description}>Get yourself one.</p>
	            <span className={classes.logo}>LOGO</span>
	          </div>
	          <div className={classes.secondHalf}>
	            {this.props.signIn ? signInForm : signUpForm}
				<button onClick={this.submitHandler} className={classes.btnSubmit} type="submit">
				{this.props.signIn ? "Log In" : "Sign Up"}
				</button> or
	            <a href="#" onClick={ !this.props.signIn ? this.props.showSignInModal : this.props.showSignUpModal} className={classes.link}>
	            { !this.props.signIn ? "Sign In" : "Sign Up"}
	            </a>
	          </div>
	        </div>
	        <div 
	          id='formCover'
	          className={classes.formCover}
	          onClick={this.props.hideModal}>
	        </div>
	      </div>
			)
	}
}

const mapStateToProps = state => {
	return{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token!==null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)