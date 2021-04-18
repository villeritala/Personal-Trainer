import React, { useState, useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import Snackbar from '@material-ui/core/Snackbar';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')){
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    setMessage('Customer deleted!');
                    openSnackbar();
                    fetchCustomers();
                }
                else
                    alert('Something went wrong');
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer), 
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok)
                fetchCustomers();
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err));
    }

    const editCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updateCustomer),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.ok) {
                setMessage('Customer edited successfully!')
                openSnackbar();
                fetchCustomers();
            }
            else
                alert('Something went wrong');
        })
        .catch(err => console.log(err));
    }

    const addTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: {
                "date":  "2018-1-1",
                "activity": "Spinning",
                "duration": "50",
                "customer" : "https://localhost:8080/api/customers/2"
            }, 
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok)
                fetchCustomers();
            else
                alert('Something went wrong');
        })
        .catch(err => console.error(err));
    }

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const column = [
        { 
            headerName: '',
            field: 'links[0].href',
            width: 100,
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon/>
            </IconButton>
        },
        {
            headerName: '', 
            field: 'links[0].href',
            width: 100, 
            cellRendererFramework: params  =>
            <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer}/>
        },
        {
            headerName:'',
            field: 'links[0].href',
            width: 150,
            cellRendererFramework: params  =>
            <AddTraining link={params.value} training={params.data} addTraining={addTraining}/>
        },
        { field: 'firstname', sortable: true, filter: true, width: 150 },
        { field: 'lastname', sortable: true, filter: true, width: 170},
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true},
    ]

    return (
        <div className="Customers">
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={column}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar 
                open={open}
                message={message}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            />
        </div>
    );
}


export default Customers;