import React, { useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from 'react-router-dom';
import useToastStore from "../store/snackbar/ToastStore";
import useAuthStore from "../store/authStore";

const Register = () => {
    const navigate = useNavigate();
    const { showSuccessToast, showErrorToast } = useToastStore();

    const { access_token, isError, register, resetErrorState } = useAuthStore();
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name: event.target.name.value.trim(),
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };

        // const errors = {};
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Invalid email address';
        }
        // if (!formData.password) {
        //     errors.password = 'Password is required';
        // }
        // setFormErrors(errors);
        //
        // if (Object.keys(errors).length === 0) {
        //
        // }

        register(formData.name,formData.email,formData.password);
        showSuccessToast('Register', 'Register successful!');
        navigate('/login');
    };

    useEffect(() => {
        if (isError) {
            showErrorToast('Register', 'Register failed!');
            resetErrorState();
        }
    }, [isError]);

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
            <h5 className="my-2">Register</h5>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputText
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    placeholder='Name'
                    name='name'
                    autoFocus
                />
                {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
                <InputText
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    placeholder='Email Address'
                    name='email'
                    autoComplete='email'
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
                    label='Register'
                    fullWidth
                    variant='contained'
                    style={{ marginTop: 24, marginBottom: 16 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to='/login'>
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
