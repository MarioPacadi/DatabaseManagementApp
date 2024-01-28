import React, {useEffect, useState} from 'react';
import {Card} from 'primereact/card';
import {Paginator} from 'primereact/paginator';
import {nameOf} from "../utils/utils";
import {City, Customer} from "../models";
import useDataStore from "../store/store";
import {Dropdown} from "primereact/dropdown";
import useSearchBarStore from "../store/searchBarStore";
import {useUpdateEffect} from "primereact/hooks";

const CustomerPage = () => {
    const { customers, cities, getData } = useDataStore();
    const {searchBarValue, setSearchBarValue} = useSearchBarStore();

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        getData(Customer,nameOf(() => customers), { page: 1, limit: rows, sort: sortField, order: sortOrder });
        getData(City,nameOf(() => cities), { limit: 1000, sort: 'name', order: 'asc' });
    }, [getData, rows, sortField, sortOrder]);

    useUpdateEffect(() => {
        getData(Customer,nameOf(() => customers), { page: first, limit: rows, sort: sortField, order: sortOrder, searchTerm: searchBarValue });
    }, [searchBarValue]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        getData(Customer,nameOf(() => customers), { page: event.page + 1, limit: event.rows, sort: sortField, order: sortOrder });
    };

    const handleSortFieldChange = (e) => {
        setSortField(e.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.value);
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

    // Define a function to generate options array based on class properties
    const generateOptionsFromProperties = (className) => {
        const classProperties = Object.keys(className)
            .filter(property => !(/\bId$/i.test(property)) && !(/guid/i.test(property))); // Filter out properties ending with "Id" and containing "guid" (case insensitive)
        return classProperties.map((property) => ({
            label: property.charAt(0).toUpperCase() + property.slice(1).replace(/Id$/, ''), // Capitalize first letter,
            value: property,
        }));
    };

    // Usage example for generating options array based on Customer class
    const customerOptions = generateOptionsFromProperties(Customer.createDefault());
    const orderOptions=[
        {label: 'Ascending', value: 'asc'},
        {label: 'Descending', value: 'desc'}
    ]

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12">
                    <h2 className="mb-2">Customer List</h2>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <div className="mr-2">Sort By:</div>
                    <Dropdown
                        placeholder={"Property"}
                        value={sortField}
                        options={customerOptions}
                        onChange={handleSortFieldChange}
                    />
                    <div className="mx-2">Order:</div>
                    <Dropdown
                        placeholder={"Select Order"}
                        value={sortOrder}
                        options={orderOptions}
                        onChange={handleSortOrderChange}
                    />
                </div>
            </div>

            <div className="row">
                {customers.map(customer => (
                    <div key={customer.id} className="col-12 col-md-6 col-lg-4 mb-3">
                        {customerTemplate(customer)}
                    </div>
                ))}
            </div>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={1000}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={onPageChange}
                className="mt-2"
            />
        </div>
    );
};

export default CustomerPage;