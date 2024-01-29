import React, {useState} from "react";
import { Dialog } from 'primereact/dialog';
import {Button} from "primereact/button";

const DialogForm = (title="Header",message="Lorem ipsum",) => {

    const [visible, setVisible] = useState(false);

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <p className="m-0">
                {message}
            </p>
        </Dialog>
    );
}
