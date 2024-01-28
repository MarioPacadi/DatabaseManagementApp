import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {LayoutPage} from './LayoutPage';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@primer/react'
import {PrimeReactProvider} from "primereact/api"; // Import from polished for color calculations
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <PrimeReactProvider>
            <ThemeProvider>
                <LayoutPage/>
            </ThemeProvider>
        </PrimeReactProvider>
    </React.StrictMode>,
)

reportWebVitals();
