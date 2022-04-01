import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    });

    

    const {name, email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        })
        .then(response => {
            console.log('SIGNUP_SUCCESS', response)
            setValues({...values, name: "", email: "", password: "", buttonText: "Submitted"})
            toast.success(response.data.message)
        })
        .catch(error => {
            console.log('SIGNUP_ERROR', error.data.error)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.data.error);

        })
    };  

    const signupForm = () => (
        <form> 
            <div className="form-group">
                <label className="text-muted"> Name </label>
                <input onChange= {handleChange('name')} type="text" value={name} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted"> Email </label>
                <input onChange= {handleChange('email')} type="email" value={email} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted"> Password </label>
                <input onChange= {handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>

    )
    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? < Redirect to="/"/> : null}
            <h1 className="p-5 text-center">Signup</h1>
            {signupForm()}
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                Forgot password
            </Link>
        </div>
    </Layout>
    );
};

export default Signup