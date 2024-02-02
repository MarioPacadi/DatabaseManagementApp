import React from 'react';
import logo from '../../assets/shopping.ico';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import {useUpdateEffect} from "primereact/hooks";
import useToastStore from "../../store/snackbar/ToastStore";
import useSearchBarStore from "../../store/searchBarStore";
import useAuthStore from "../../store/authStore";
import {getToken} from "../../utils/utils";

export default function ResponsiveAppBar() {

    const navigate = useNavigate();
    const {showInfoToast, showWarningToast} = useToastStore();
    const {searchBarValue, setSearchBarValue} = useSearchBarStore();
    const {access_token,logout} = useAuthStore();

    useUpdateEffect(() => {
        showInfoToast("Searched",searchBarValue)
    }, [searchBarValue]);
    const itemTemplate = (item) => (
        <a className="d-flex align-items-center p-menuitem-link my-2" onClick={item.command}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
        </a>
    );

    const items = [
        { label: 'Customers List', icon: 'pi pi-users', template: itemTemplate, command: () => { navigate('/customers')} },
    ];

    if (getToken()) {
        items.push(
            { label: 'Profile', icon: 'pi pi-user-edit', template: itemTemplate,
                command: () => {
                    navigate('/profile');
                }
            },
            { label: 'Logout', icon: 'pi pi-sign-out', template: itemTemplate,
                command: () => {
                    logout();
                    localStorage.removeItem('access_token');
                    showWarningToast("Logout","You have logged out!");
                    navigate('/customers');
                }
            },
        );
    } else {
        items.push(
            { label: 'Login', icon: 'pi pi-sign-in', template: itemTemplate, command: () => {navigate('/login')} },
            { label: 'Register', icon: 'pi pi-user-plus', template: itemTemplate, command: () => {navigate('/register')} },
        );
    }

    const start = (
        <div className="d-flex align-items-center gap-2">
            <img alt="logo" src={logo} height="40" className="mx-2"></img>
            <h3 className="mx-2 d-none d-md-block">Database Manager</h3>
        </div>
    );

    const end = (
        <div className="d-flex align-items-center gap-2">
            <span className="p-input-icon-left">
                <i className="pi pi-search"></i>
                <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto mx-1"
                           defaultValue={searchBarValue}
                           onBlur={(e) => setSearchBarValue(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   setSearchBarValue(e.target.value);
                               }
                           }}
                />
            </span>
        </div>
    );

    return (
        <div className="container">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}