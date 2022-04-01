import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {authenticate, isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify';
import Google from './Google'
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit"
    });

    const {email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    };

    const informParent = response => {
        authenticate(response, ()=> {
            isAuth() && isAuth().role === "admin" ? history.push('/admin') : history.push('/private')
         })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
        .then(response => {
                console.log('SIGNIN_SUCCESS', response)
                // save the response(user,token) localstorage/cookie
                authenticate(response, ()=> {
                    setValues({...values, name: "", email: "", password: "", buttonText: "Submitted"})
                    toast.success(`Hey ${response.data.user.name}, Welcome back!`)
                    isAuth() && isAuth().role === "admin" ? history.push('/admin') : history.push('/private')
                 })
        })
        .catch(error => {
            console.log('SIGNIN_ERROR', error.data.error)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.data.error);

        });
    };  

    const signinForm = () => (
        <form> 
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
            {JSON.stringify(isAuth())}
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <p> hello </p>
            <h1 className="p-5 text-center">Signin</h1>
            <Google informParent = {informParent} />
            {signinForm()}
            <br />
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                Forgot password
            </Link>
        </div>
    </Layout>
    );
};

export default Signin