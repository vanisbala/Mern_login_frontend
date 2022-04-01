import React, {useState} from 'react';
import jwt_decode from "jwt-decode";
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

const Reset = ({ match }) => { //props.match from react router dom
    const [values, setValues] = useState({
        name: "",
        token:"",
        newPassword:"",
        buttonText: "Reset password"
    });

    useEffect(() => {
        let token = match.params.token
        let {name} = jwt_decode(token)
        if(token){
            setValues({...values, name, token});
        }
    },[])

    const {name, token, newPassword, buttonText} = values;

    const handleChange = (event) => {
        setValues({...values, newPassword: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink:token}
        })
        .then(response => {
                console.log('RESET PASSWORD SUCCESS', response)
                toast.success(response.data.message)
                setValues({...values, buttonText: 'Done'})
        })
        .catch(error => {
            console.log('RESET PASSWORD ERROR', error.data.error)
            toast.error(error.data.error);
            setValues({...values, buttonText: 'Reset password'})
        });
    };  

    const resetPasswordForm = () => (
        <form> 
            <div className="form-group">
                <label className="text-muted"> Password </label>
                <input  onChange= {handleChange}
                        value={newPassword} 
                        type="password" 
                        className="form-control" 
                        // placeholder= "Type new password" 
                        required
                />
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    );
    return (
    <Layout>
        <div className="col-d-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Hey, {name} type your new password</h1>
            {resetPasswordForm()}
        </div>
    </Layout>
    );
};

export default Reset