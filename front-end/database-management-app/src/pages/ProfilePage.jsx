import React, {useEffect, useState} from 'react';
import useAuthStore from "../store/authStore";
import {useMountEffect, useUpdateEffect} from "primereact/hooks";
import {getUserId, nameOf} from "../utils/utils";
import useToastStore from "../store/snackbar/ToastStore";

const ProfilePage = () => {
    const { user, getUser, updateUser, resetErrorState } = useAuthStore(); // Fetch user data and updateUser function from useAuthStore
    const {showInfoToast} = useToastStore();

    // State to manage form data and validation errors
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || ''
    });
    const [errors, setErrors] = useState({});

    useMountEffect(() => {
        getUser({id: getUserId()});
    });

    useUpdateEffect(()=>{
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            password: user?.password || ''
        })
    },[user])

    // Handler for form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form validation function
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Call updateUser function from useAuthStore to update user profile
            updateUser(user.id,formData).then(() => {
                // Once deletion is successful, reload the page
                // window.location.reload();
                showInfoToast('Updated', 'Successfully updated User');
            })
        }
    };

    return (
        <div className="container"
             style={{
            display: 'flex',
            height: '100vh',
            paddingTop: 15,
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2 className="my-4">Profile</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errors.name && 'is-invalid'}`} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email && 'is-invalid'}`} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`form-control ${errors.password && 'is-invalid'}`} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Edit Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
