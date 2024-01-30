import React, {useEffect, useState} from 'react';
import {Paginator} from 'primereact/paginator';
import {filteredNameOf, findByID, generateOptionsFromProperties, nameOf} from "../utils/utils";
import {Bill, Item, Product} from "../models";
import useDataStore from "../store/store";
import {Dropdown} from "primereact/dropdown";
import useSearchBarStore from "../store/searchBarStore";
import {useUpdateEffect} from "primereact/hooks";
import "../components/cards/cards.css"
import {useNavigate, useParams} from "react-router-dom";
import ItemCard from "../components/cards/ItemCard";
import {deletePopup} from "../components/forms/ConfirmPopupButton";
import useToastStore from "../store/snackbar/ToastStore";
import {Button} from "primereact/button";
import {getToken} from "../utils/utils";

export default function ItemsPage() {

    const { billId } = useParams();

    const { items,products,bills, getData, deleteData } = useDataStore();
    const {searchBarValue} = useSearchBarStore();
    const {showInfoToast, showWarningToast} = useToastStore();

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const propertyName = filteredNameOf(() => Item.createDefault().billId);
    const bill = findByID(billId,bills);

    useEffect(() => {
        getData(Item, nameOf(() => items), { page: first, limit: rows, sort: sortField, order: sortOrder, [propertyName]: billId });
        getData(Product,nameOf(() => products), { limit: 2100, sort: 'name', order: 'asc' });
    }, [getData, rows, sortField, sortOrder]);

    useUpdateEffect(() => {
        getData(Item, nameOf(() => items), { page: first, limit: rows, sort: sortField, order: sortOrder, [propertyName]: billId, searchTerm: searchBarValue });
    }, [searchBarValue]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        getData(Item, nameOf(() => items), { page: event.page + 1, limit: event.rows, sort: sortField, order: sortOrder, [propertyName]: billId });
    };

    const handleSortFieldChange = (e) => {
        setSortField(e.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.value);
    };

    // Usage example for generating options array based on Customer class
    const billsOptions = generateOptionsFromProperties(Item.createDefault());
    const orderOptions=[
        {label: 'Ascending', value: 'asc'},
        {label: 'Descending', value: 'desc'}
    ]

    const navigate = useNavigate()

    const handleDelete = (event, item) => {
        deletePopup(
            () => {
                deleteData(Item,item.id)
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
                    <h2 className="mb-2">Bill Items List</h2>
                    {getToken() && (
                    <Button icon="pi pi-plus" outlined severity="info" aria-label="Add"
                            className="ms-2 rounded-circle"
                            onClick={()=>{navigate("/insert-item")}}
                    />)}
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
                {items.map(item => (
                    <div key={item?.id} className="col-12 col-md-6 col-lg-4 mb-3">
                        <ItemCard
                            item={item}
                            bill={bill}
                            products={products}
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