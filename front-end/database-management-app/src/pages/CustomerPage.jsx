import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import {nameOf} from "../utils/utils";
import {City, Customer} from "../models";
import useDataStore from "../store/store"; // Assuming you have created a data store

const CustomerPage = () => {
    const { customers, cities, getData } = useDataStore();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        getData(Customer,nameOf(() => customers),{ page: 1, limit: rows });
        getData(City,nameOf(() => cities), { limit: 1000, sort: 'name', order: 'asc' });
    }, [getData, rows]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        getData(Customer,nameOf(() => customers), { page: event.page + 1, limit: event.rows });
    };

    const findCityName = (cityId) => {
        if (!cityId) return 'undefined'; // Handle case where cityId is null or undefined

        if (!cities) return 'noCities';

        const city = cities.find(city => city.id === cityId);
        return city ? city.name : 'Unknown'; // Return city name or 'Unknown' if city not found
    };

    const customerTemplate = (customer) => (
        <div className="p-col-12 p-md-3" key={customer.id}>
            <Card title={`${customer.name} ${customer.surname}`}>
                <div>Email: {customer.email}</div>
                <div>Phone: {customer.telephone}</div>
                {customer.cityId && <div>City: {findCityName(customer.cityId)}</div>}
            </Card>
        </div>
    );

    return (
        <div>
            <h2 className="p-md-3">Customer List</h2>
            <div className="p-grid">
                {customers.map(customer => customerTemplate(customer))}
            </div>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={1000}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default CustomerPage;