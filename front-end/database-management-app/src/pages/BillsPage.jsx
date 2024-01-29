import React, {useEffect, useState} from 'react';
import {Paginator} from 'primereact/paginator';
import {filteredNameOf, findByID, generateOptionsFromProperties, nameOf} from "../utils/utils";
import {Bill, CreditCard, Customer, Seller} from "../models";
import useDataStore from "../store/store";
import {Dropdown} from "primereact/dropdown";
import useSearchBarStore from "../store/searchBarStore";
import {useUpdateEffect} from "primereact/hooks";
import "../components/cards/cards.css"
import BillCard from "../components/cards/BillCard";
import {useNavigate, useParams} from "react-router-dom";
import {deletePopup} from "../components/forms/ConfirmPopupButton";
import useToastStore from "../store/snackbar/ToastStore";
import {Button} from "primereact/button";

export default function BillsPage() {

    const { customerId } = useParams();

    const { bills, customers, sellers,creditCards, getData, deleteData } = useDataStore();
    const {searchBarValue} = useSearchBarStore();
    const {showInfoToast, showWarningToast} = useToastStore();

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const propertyName = filteredNameOf(() => Bill.createDefault().customerId);
    const customer = findByID(customerId,customers);

    useEffect(() => {
        getData(Bill, nameOf(() => bills), { page: first, limit: rows, sort: sortField, order: sortOrder, [propertyName]: customerId });
        // getData(Bill,nameOf(() => bills), { page: 1, limit: rows, sort: sortField, order: sortOrder });
        getData(Seller,nameOf(() => sellers), { sort: 'name', order: 'asc' });
        getData(CreditCard,nameOf(() => creditCards), { limit: 3000, sort: 'type', order: 'asc' });
    }, [getData, rows, sortField, sortOrder]);

    useUpdateEffect(() => {
        getData(Bill,nameOf(() => bills), { page: first, limit: rows, sort: sortField, order: sortOrder, [propertyName]: customerId, searchTerm: searchBarValue });
    }, [searchBarValue]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        getData(Bill,nameOf(() => bills), { page: event.page + 1, limit: event.rows, sort: sortField, order: sortOrder, [propertyName]: customerId });
    };

    const handleSortFieldChange = (e) => {
        setSortField(e.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.value);
    };

    // Usage example for generating options array based on Customer class
    const billsOptions = generateOptionsFromProperties(Bill.createDefault());
    const orderOptions=[
        {label: 'Ascending', value: 'asc'},
        {label: 'Descending', value: 'desc'}
    ]

    const navigate = useNavigate()

    const handleShowItems = (bill)=>{
        // I will give function to execute for Delete and Show
        // navigate('/customer-bills',customer)
        navigate(`/items/${bill.id}`);
    }

    const handleDelete = (event, bill) => {
        deletePopup(
            () => {
                deleteData(Bill,bill.id)
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

    // Check if state exists and access its properties
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center align-items-center my-3">
                    <h2 className="mb-2">Customer Bills</h2>
                    <Button icon="pi pi-plus" outlined severity="info" aria-label="Add"
                            className="ms-2 rounded-circle"
                            onClick={()=>{navigate("/insert-bill")}}
                    />
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center my-2">
                    <div className="mr-2">Sort By:</div>
                    <Dropdown
                        placeholder={"Property"}
                        value={sortField}
                        options={billsOptions}
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
                {bills.map(bill => (
                    <div key={bill?.id} className="col-12 col-md-6 col-lg-4 mb-3">
                        <BillCard
                            bill={bill}
                            customer={customer}
                            sellers={sellers}
                            creditCards={creditCards}
                            handleShowItems={handleShowItems}
                            handleDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={5100}
                rowsPerPageOptions={[10, 20, 50]}
                onPageChange={onPageChange}
                className="mt-2"
            />
        </div>
    );
};