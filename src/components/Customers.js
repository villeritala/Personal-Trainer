import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const column = [
        { field: 'firstname', sortable: true, filter: true, width: 150},
        { field: 'lastname', sortable: true, filter: true, width: 170},
        { field: 'streetadress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true},
    ]

    return (
        <div className="App">
            <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={column}
                    pagination={true}
                    paginationPageSize={8}
                />
            </div>
        </div>
    );
}


export default Customers;