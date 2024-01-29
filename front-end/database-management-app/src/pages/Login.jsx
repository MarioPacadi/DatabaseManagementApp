import React, { useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import useToastStore from "../store/snackbar/ToastStore";
import useAuthStore from "../store/authStore";

const Login = () => {
    const navigate = useNavigate();
    const { showSuccessToast, showErrorToast } = useToastStore();

    const { access_token, isError, login } = useAuthStore();
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };

        // const errors = {};
        // if (!formData.email) {
        //     errors.email = 'Email is required';
        // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     errors.email = 'Invalid email address';
        // }
        // if (!formData.password) {
        //     errors.password = 'Password is required';
        // }
        // setFormErrors(errors);
        //
        // if (Object.keys(errors).length === 0) {
        //
        // }

        login(formData.email,formData.password);
    };


    useEffect(() => {
        if (access_token) {
            // console.log("jwt: "+ access_token)
            localStorage.setItem('access_token', access_token ?? undefined);
            showSuccessToast('Login', 'Login successful!');
            navigate('/customers');
        }
    }, [access_token, navigate, showSuccessToast]);

    useEffect(() => {
        if (isError) {
            showErrorToast('Login', 'Login failed!');
        }
    }, [isError, showErrorToast]);

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                paddingTop: 15,
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
            <h5 className="my-2">Login</h5>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputText
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    placeholder='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                />
                {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                <InputText
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    placeholder='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                />
                {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                <Button
                    type='submit'
                    label='Sign In'
                    fullWidth
                    variant='contained'
                    style={{ marginTop: 24, marginBottom: 16 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to='#' style={{ marginRight: 'auto' }}>
                        Forgot password?
                    </Link>
                    <Link to='/register'>
                        {'Don\'t have an account? Sign Up'}
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
