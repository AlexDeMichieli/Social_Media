import React, {Fragment, useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login, isAuthenticated}) => {

    const initialState = {
        email: "",
        password: "",
    };

    const [form, setForm] = useState(initialState);

    const clearState = () => {
        setForm({ ...initialState });
    };

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    const onChange = event => {
        const { name, value } = event.target;
        setForm(state => ({ ...state, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        login(form.email, form.password)
        clearState()
       
    };

    return (

        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign in</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" value={form.email} onChange={onChange} placeholder="Email Address" name="email" />
                </div>
                    <div className="form-group">
                <input
                    onChange={onChange}
                    value={form.password}
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

login.PropTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, {login})(Login)