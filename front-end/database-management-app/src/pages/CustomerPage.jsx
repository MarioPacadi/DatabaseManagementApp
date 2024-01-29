import React, {useEffect, useState} from 'react';
import {Paginator} from 'primereact/paginator';
import {generateOptionsFromProperties, nameOf} from "../utils/utils";
import {Bill, City, Customer} from "../models";
import useDataStore from "../store/store";
import {Dropdown} from "primereact/dropdown";
import useSearchBarStore from "../store/searchBarStore";
import {useMountEffect, useUpdateEffect} from "primereact/hooks";
import CustomerCard from "../components/cards/CustomerCard";
import "../components/cards/cards.css"
import {useNavigate} from "react-router-dom";
import useToastStore from "../store/snackbar/ToastStore";
import {deletePopup} from "../components/forms/ConfirmPopupButton";
import {Button} from "primereact/button";

export default function CustomerPage() {

    const { customers,cities, getData, deleteData } = useDataStore();
    const {searchBarValue} = useSearchBarStore();
    const {showInfoToast, showWarningToast} = useToastStore();

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        getData(Customer,nameOf(() => customers), { page: 1, limit: rows, sort: sortField, order: sortOrder });
        getData(City,nameOf(() => cities), { limit: 1000, sort: 'name', order: 'asc' });
        // eslint-disable-next-line
    }, [getData, rows, sortField, sortOrder]);

    useUpdateEffect(() => {
        getData(Customer,nameOf(() => customers), { page: first, limit: rows, sort: sortField, order: sortOrder, searchTerm: searchBarValue });
        // eslint-disable-next-line
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

    // Usage example for generating options array based on Customer class
    const customerOptions = generateOptionsFromProperties(Customer.createDefault());
    const orderOptions=[
        {label: 'Ascending', value: 'asc'},
        {label: 'Descending', value: 'desc'}
    ]

    const navigate = useNavigate()

    const handleShowBills = (customer)=>{
        // I will give function to execute for Delete and Show
        // navigate('/customer-bills',customer)
        navigate(`/bills/${customer.id}`,{state: customer.id});
    }

    const handleDelete = (event, customer) => {
        deletePopup(
            () => {
                deleteData(Customer, customer.id)
                    .then(() => {
                        // Once deletion is successful, reload the page
                        window.location.reload();
                        showInfoToast('Confirmed', 'You have deleted item.');
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error('Error deleting item:', error);
                    });
            },
            () => {
                showWarningToast('Rejected', 'You have rejected');
            }
        )(event);
    };

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center align-items-center my-3">
                    <h2 className="mb-2">Customer List</h2>
                    <Button icon="pi pi-plus" outlined severity="info" aria-label="Add"
                            className="ms-2 rounded-circle"
                            onClick={()=>{navigate("/insert-customer")}}
                    />
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center my-2">
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
                        <CustomerCard
                            customer={customer}
                            cities={cities}
                            handleShowBills={handleShowBills}
                            handleDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={1100}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={onPageChange}
                className="mt-2"
            />
        </div>
    );
};