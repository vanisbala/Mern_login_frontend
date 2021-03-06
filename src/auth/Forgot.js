import React, {useState} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        email: "",
        buttonText: "Request password reset link"
    });

    const {email, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
        .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response)
                toast.success(response.data.message)
                setValues({...values, buttonText: 'Requested'})
        })
        .catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.data.error)
            toast.error(error.data.error);
            setValues({...values, buttonText: 'Request password reset link'})
        });
    };  

    const forgotPasswordForm = () => (
        <form> 
            <div className="form-group">
                <label className="text-muted"> Email </label>
                <input onChange= {handleChange('email')} type="email" value={email} className="form-control" />
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
            <h1 className="p-5 text-center">Forgot Password</h1>
            {forgotPasswordForm()}
        </div>
    </Layout>
    );
};

export default Forgot