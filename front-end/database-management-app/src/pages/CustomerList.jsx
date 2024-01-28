import React, {useEffect} from 'react';
import useDataStore from '../store/store'
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import {Customer} from "../models";
import {City} from "../models";
import {nameOf} from "../utils/utils";

const CustomerList = () => {

    const { customers, cities, getData } = useDataStore();

    useEffect(() => {
        getData(Customer,nameOf(() => customers),{page: 1, limit: 10,});
        getData(City,nameOf(() => cities), { limit: 1000, sort: 'name', order: 'asc' });
        // eslint-disable-next-line
    }, []);


    const customerTemplate = (customer) => {

        const findCityName = (cityId) => {
            if (!cityId) return 'undefined'; // Handle case where cityId is null or undefined

            if (!cities) return 'noCities';

            const city = cities.find(city => city.id === cityId);
            return city ? city.name : 'Unknown'; // Return city name or 'Unknown' if city not found
        };

        return (
            <div className="p-col-12 p-md-3">
                <Card title={`${customer.name} ${customer.surname}`}>
                    <div>Email: {customer.email}</div>
                    <div>Phone: {customer.telephone}</div>
                    {
                        customer.cityId &&
                        <div>City: {findCityName(customer.cityId)}</div>
                    }
                </Card>
            </div>
        );
    };

    return (
        <div>
            <h2>Customer List</h2>
            <div className="p-grid">
                <DataView value={customers} itemTemplate={customerTemplate} />
            </div>
        </div>
    );
};

export default CustomerList;
