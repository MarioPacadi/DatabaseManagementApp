import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React from "react";
import {findNameByID} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const CustomerCard = ({ customer, cities, handleShowBills, handleDelete }) => {

    return (
        <div className="p-col-12 p-md-3" key={customer.id}>
            <Card title={`${customer.name} ${customer.surname}`} className="card-container">
                <div>Email: {customer.email}</div>
                <div>Phone: {customer.telephone}</div>
                {customer.cityId && <div>City: {findNameByID(customer.cityId, cities)}</div>}
                <Button label="Show Bills" className="p-button-warning p-dock-right my-3 me-2"
                        onClick={() => handleShowBills(customer)}/>
                <Button label="Delete" className="p-button-danger p-dock-right my-3 me-2"
                        onClick={() => handleDelete(customer)}/>
            </Card>
        </div>
    );
};

export default CustomerCard;