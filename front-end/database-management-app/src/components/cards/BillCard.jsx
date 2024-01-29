import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React from "react";
import {findTypeByID, getToken} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import {Divider} from "primereact/divider";

const BillCard = ({bill, customer, sellers, creditCards, handleShowItems, handleDelete}) => {

    return (
        <div className="p-col-12 p-md-3" key={bill.id}>
            <Card title={`Bill number: ${bill.billNumber}`} className="card-container">
                <div className="fw-bold">{`Total: ${bill.total} €`}</div>
                <div>Comment: {bill.comment}</div>
                {bill.creditCardId && <div>CreditCard: {findTypeByID(bill.creditCardId, creditCards)}</div>}
                <Divider />
                {getToken() && (
                    <div>
                        <Button label="Show Items" className="p-button-warning p-dock-right my-3 me-2"
                                onClick={() => handleShowItems(bill)}/>
                        <Button label="Delete" className="p-button-danger p-dock-right my-3 me-2"
                                onClick={(event) => handleDelete(event, bill)}/>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default BillCard;