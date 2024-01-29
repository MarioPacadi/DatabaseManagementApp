import {confirmPopup} from "primereact/confirmpopup";

export const deletePopup = (accept, reject) => {
    return (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger mx-2',
            accept,
            reject
        });
    };
};