// ToastExample.jsx
import { Button } from 'primereact/button';
import useToastStore from '../../store/snackbar/ToastStore';
import React from "react";

const ToastExample = () => {
    const {showInfoToast, showSuccessToast, showErrorToast, showWarningToast, showBasicToast} = useToastStore();

    const infoShow = () => showInfoToast('Form Submitted', 'The form is successfully submitted.' );
    const successShow = () => showSuccessToast('Form Submitted', 'The form is successfully submitted.' );
    const errorShow = () => showErrorToast('Form Submitted', 'The form is successfully submitted.' );
    const warningShow = () => showWarningToast('Form Submitted', 'The form is successfully submitted.' );
    const basicShow = () => showBasicToast('Form Submitted', 'The form is successfully submitted.' );

    // Define inline styles
    const customStyles = {
        backgroundColor: 'red',
        margin: '10px',
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button onClick={infoShow} severity="info">Info</Button>
            <Button onClick={successShow} severity="success">Success</Button>
            <Button onClick={errorShow} severity="danger">Error</Button>
            <Button onClick={warningShow} severity="warning">Warning</Button>
            <Button onClick={basicShow} severity="help">Basic</Button>
        </div>
    );
};

export default ToastExample;
