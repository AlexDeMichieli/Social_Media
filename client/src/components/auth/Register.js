import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'

const Register = () => {

    const initialState = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    const [form, setForm] = useState(initialState);

    const clearState = () => {
        setForm({ ...initialState });
    };

    const onChange = event => {
        const { name, value } = event.target;
        setForm(state => ({ ...state, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if(form.password !== form.passwordConfirmation){
            console.log("passwords don't match")
        }else{
            clearState();
            console.log(form);
            const newUser = {
                name: form.name,
                email: form.email,
                password: form.password,
                passwordConfirmation: form.passwordConfirmation,
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
                const body = JSON.stringify(newUser)
                const res = await axios.post('/api/users', body, config)
                console.log(res.data)
                
            } catch (error) {
                console.error(error.response.data)
            }
        }
    };

    return (

        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <input type="text" value={form.name} placeholder="Name" onChange={onChange} name="name" required />
                </div>
                <div className="form-group">
                <input type="email" value={form.email} onChange={onChange} placeholder="Email Address" name="email" />
                <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
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
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Register