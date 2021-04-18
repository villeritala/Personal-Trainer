import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')){
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    setMessage('Training deleted!');
                    openSnackbar();
                    fetchTrainings();
                }
                else
                    alert('Something went wrong');
            })
            .catch(err => console.error(err))
        }
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
            <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon/>
            </IconButton>
        },
        { 
            field: 'id', sortable: true, filter: true 
        },
        { 
            field: 'date', sortable: true, filter: true, width: 250, 
            cellRenderer: (data) => { return moment(data.date).format('MM/DD/YYYY HH:mm')}
        },
        { 
            field: 'duration', sortable: true, filter: true 
        },
        { 
            field: 'activity', sortable: true, filter: true 
        },
    ]

    return (
        <div className="App">
            <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
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

export default Trainings;