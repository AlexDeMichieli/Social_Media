import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";


const Register = ({setAlert, register, isAuthenticated}) => {

  const initialState = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [form, setForm] = useState(initialState);

  const clearState = () => {
    setForm({ ...initialState });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirmation) {
      //passes attributes in parenthesis to alert.js in folder 'actions'
      setAlert("passwords don't match", "danger");
    } else {
      clearState();
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      console.log(form.name, form.email)
      register(newUser)
    }
  };

  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={form.name}
            placeholder="Name"
            onChange={onChange}
            name="name" 
            required
            
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email Address"
            name="email"
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            onChange={onChange}
            value={form.passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//connect is connecting Register.js to alert.js in folder actions
//the setAlert action is passed in as a prop, which is destructured above and called when passwords don't match.
//The action returns a payload (which is passed in to the component)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
