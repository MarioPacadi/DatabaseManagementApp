import React from 'react';
import logo from '../../assets/shopping.ico';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import {useUpdateEffect} from "primereact/hooks";
import useToastStore from "../../store/snackbar/ToastStore";
import useSearchBarStore from "../../store/searchBarStore";

export default function ResponsiveAppBar() {

    const {showInfoToast} = useToastStore();
    const {searchBarValue, setSearchBarValue} = useSearchBarStore();

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
        { label: 'Profile', icon: 'pi pi-user', template: itemTemplate, command: () => {} },
        { label: 'Logout', icon: 'pi pi-power-off', template: itemTemplate, command: () => {} },
    ];

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