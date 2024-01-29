import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Background from "./components/background/Background";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import {useEffect, useRef} from "react";
import useToastStore from "./store/snackbar/ToastStore";
import {Toast} from "primereact/toast";
import CustomerPage from "./pages/CustomerPage";
import BillsPage from "./pages/BillsPage";
import Login from "./pages/Login";
import ItemsPage from "./pages/ItemsPage";
import Register from "./pages/Register";

export function LayoutPage() {

    const toastRef = useRef(null);

    useEffect(() => {
        // Set the toastRef in the store
        useToastStore.getState().setToastRef(toastRef.current);
    }, []);

  return (
      <BrowserRouter>
          <ResponsiveAppBar />
          <Toast ref={toastRef} />
            <Background>
                <Routes>
                    <Route path='/' element={<Navigate to='/customers' />} />
                    <Route path='/customers' element={<CustomerPage />} />
                    <Route path="/bills/:customerId" element={<BillsPage />} />
                    <Route path="/items/:billId" element={<ItemsPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Background>
      </BrowserRouter>
  )
}

export default LayoutPage;
