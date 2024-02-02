import React, {useEffect, useState} from 'react';
import useAuthStore from "../store/authStore";
import {useMountEffect} from "primereact/hooks";
import {nameOf} from "../utils/utils";

const ProfilePage = () => {
    const { user, getUser, updateUser } = useAuthStore(); // Fetch user data and updateUser function from useAuthStore

    // State to manage form data and validation errors
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user?.email){
            getUser(user?.email);
        }
        console.log("User:"+user)
    });

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
            updateUser(formData);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Profile</h2>
            <form onSubmit={handleSubmit}>
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
                {/* Add more input fields for other profile information */}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfilePage;
