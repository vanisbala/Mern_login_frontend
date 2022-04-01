import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';

import jwt_decode from "jwt-decode";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: "",
        token: "",
        show: true,
        //http://localhost:3000/auth/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmFsYSIsImVtYWlsIjoidmFuaXNiYWxhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYmFsYTEyMyIsImlhdCI6MTY0ODQ5MDM0OCwiZXhwIjoxNjQ4NDkwOTQ4fQ.weigy6qxzOz9El8YycHbH-IJOto-TdpRTyYJZBdUTmA
    });

    useEffect(() => {
        let token= match.params.token
        console.log(token)
        console.log(jwt_decode(token))
        let {name} = jwt_decode(token)
        if(token) {
            setValues({...values, name, token})
        }
    }, [])

    const {name, token, show} = values;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then(response => {
            console.log('ACCOUNT_ACTIVATION_SUCCESS', response)
            setValues({...values,show: false})
            toast.success(response.data.message)
        })
        .catch(error => {
            console.log('SIGNUP_ERROR', error.data.error)
            toast.error(error.data.error);

        })
    }; 
    
    const activationLink = () => (
        <div className="text-center">
            <h1 className= "p-5"> Hey {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>
                Activate Account
            </button>
        </div>
    )


    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {activationLink()}
        </div>
    </Layout>
    );
};

export default Activate