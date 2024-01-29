import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React from "react";
import {findTypeByID} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const BillCard = ({bill, customer, sellers, creditCards, handleShowItems, handleDelete}) => {

    return (
        <div className="p-col-12 p-md-3" key={bill.id}>
            <Card title={`${bill.billNumber}: ${bill.total} €`} className="card-container">
                <div>Comment: {bill.email}</div>
                {/*{bill.creditCardId && <div>CreditCard: {findTypeByID(bill.creditCardId, creditCards)}</div>}*/}
                <Button label="Show Bills" className="p-button-warning p-dock-right my-3 me-2"
                        onClick={() => handleShowItems(bill)}/>
                <Button label="Delete" className="p-button-danger p-dock-right my-3 me-2"
                        onClick={() => handleDelete(bill)}/>
            </Card>
        </div>
    );
};

export default BillCard;