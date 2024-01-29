import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';

const GenerateForm = (classObject, handleSubmitCallback) => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitCallback(formData);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', paddingTop: 15, flexDirection: 'column', alignItems: 'center' }}>
            <Avatar icon="pi pi-plus" size="xlarge" shape="circle" style={{ backgroundColor: '#21d4f3', color: '#ffffff' }} />
            <h5 className="my-2">Insert {classObject.constructor.name}</h5>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(classObject)
                    .filter(([key, value]) => !/\bId$/i.test(key)) // Filter out properties with names ending with "Id"
                    .map(([key, value]) => (
                    <div key={key} className="p-field">
                        <span className="p-float-label">
                            <InputText type="text" name={key} value={formData[key] || ''} onChange={handleChange} />
                            <label htmlFor={key}>{key}</label>
                        </span>
                    </div>
                ))}
                <Button type="submit" label="Submit" className="p-button-primary" style={{ marginTop: 24, marginBottom: 16 }} />
            </form>
        </div>
    );
};

export default GenerateForm;
