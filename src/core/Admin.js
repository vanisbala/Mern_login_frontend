import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser} from '../auth/helpers'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    });

    const token = getCookie('token')

    const loadProfile = () => {
        axios({
            mehtod: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE', response)
            const {role, name, email} = response.data
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.log('PROFILE UPDATE ERROR', error.data.error)
            if(error.status === 401){
                signout(() => {
                    history.push('/');
                });
            }
        });
    };

    useEffect(() => {
        loadProfile();
    }, []);

    

    const {role, name, email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting...'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data: {name, password},
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE SUCCESS', response)
            updateUser((response), () => {
                setValues({...values, buttonText: "Submitted"});
                toast.success('Profile updated successfully');
            });
        })
        .catch(error => {
            console.log('PRIVATE PROFILE UPDATE ERROR', error.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.data.error);

        })
    };  

    const updateForm = () => (
        <form> 
             <div className="form-group">
                <label className="text-muted">Role </label>
                <input  type="text" defaultValue={role} className="form-control" disabled/>
            </div>

            <div className="form-group">
                <label className="text-muted"> Name </label>
                <input onChange= {handleChange('name')} type="text" value={name} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted"> Email </label>
                <input type="email" defaultValue={email} className="form-control" disabled />
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
            <h1 className="p-5 text-center">Admin - Profile update</h1>
            {updateForm()}
        </div>
    </Layout>
    );
};

export default Admin