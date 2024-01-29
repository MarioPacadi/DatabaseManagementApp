import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React from "react";
import {findNameByID, findTypeByID, getToken} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const ItemCard = ({item,bill, products, handleDelete}) => {

    return (
        <div className="p-col-12 p-md-3" key={item.id}>

            <Card title={`Item - Product: ${findNameByID(item.productId, products)}`} className="card-container">
                <div className="fw-bold">{`Total: ${item.totalPrice} €`}</div>
                <div>Quantity: {item.quantity}</div>
                {/*{item.productId && <div>Product: {findNameByID(item.productId, products)}</div>}*/}
                {getToken() && (
                        <Button label="Delete" className="p-button-danger p-dock-right my-3 me-2" onClick={() => handleDelete(bill)}/>
                )}
            </Card>
        </div>
    );
};

export default ItemCard;