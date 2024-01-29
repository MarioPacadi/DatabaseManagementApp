import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React from "react";
import useDataStore from "../../store/store";

const CustomerCard = (customer) => {
    const {cities} = useDataStore();

    const findCityName = (cityId) => {
        if (!cityId) return 'undefined'; // Handle case where cityId is null or undefined

        if (!cities) return 'noCities';

        const city = cities.find(city => city.id === cityId);
        return city ? city.name : 'Unknown'; // Return city name or 'Unknown' if city not found
    };

    const handleDelete = (customerId)=>{

    }

    return (
        <div className="p-col-12 p-md-3" key={customer.id}>
            <Card title={`${customer.name} ${customer.surname}`}>
                <div>Email: {customer.email}</div>
                <div>Phone: {customer.telephone}</div>
                {customer.cityId && <div>City: {findCityName(customer.cityId)}</div>}
                <Button label="Show Bills" className="p-button-warning p-dock-right my-3 me-2"
                        onClick={() => handleDelete(customer.id)}/>
                <Button label="Delete" className="p-button-danger p-dock-right my-3 me-2"
                        onClick={() => handleDelete(customer.id)}/>
            </Card>
        </div>
    );
};

export default CustomerCard;