import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Background from "./components/background/Background";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import React, {useEffect, useRef} from "react";
import useToastStore from "./store/snackbar/ToastStore";
import {Toast} from "primereact/toast";
import CustomerPage from "./pages/CustomerPage";
import BillsPage from "./pages/BillsPage";
import Login from "./pages/Login";
import ItemsPage from "./pages/ItemsPage";
import Register from "./pages/Register";
import {ConfirmPopup} from "primereact/confirmpopup";
import InsertForm from "./pages/forms/InsertForm";
import {Bill, Customer, Item} from "./models";
import NoMatch from './pages/forms/NoMatch';
import {getToken} from "./utils/utils";
import ProfilePage from "./pages/ProfilePage";

export function LayoutPage() {

    const toastRef = useRef(null);

    useEffect(() => {
        // Set the toastRef in the store
        useToastStore.getState().setToastRef(toastRef.current);
    }, []);

    function PrivateRoute(element){
        return getToken() ? element : <Navigate to="/login" replace />
    }

  return (
      <BrowserRouter>
          <ResponsiveAppBar />
          <Toast ref={toastRef} />
          <ConfirmPopup />
            <Background>
                <Routes>
                    <Route path='/' element={<Navigate to='/customers' />} />
                    <Route path='*' element={<NoMatch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/customers' element={<CustomerPage />} />
                    <Route path="/bills/:customerId" element={PrivateRoute(<BillsPage />)} />
                    <Route path="/items/:billId" element={PrivateRoute(<ItemsPage />)} />
                    <Route path="/insert-customer" element={PrivateRoute(<InsertForm DataType={Customer} />)} />
                    <Route path="/insert-bill" element={PrivateRoute(<InsertForm DataType={Bill} />)} />
                    <Route path="/insert-item" element={PrivateRoute(<InsertForm DataType={Item} />)} />
                    <Route path="/profile" element={PrivateRoute(<ProfilePage />)} />
                </Routes>
            </Background>
      </BrowserRouter>
  )
}



export default LayoutPage;
