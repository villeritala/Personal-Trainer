import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', 
        activity: '',
        duration: '',
        customer: props.customerId
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <div>
        <Button color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker 
                    label="Date" 
                    margin="dense" 
                    value={selectedDate} 
                    name="date" 
                    onChange={handleDateChange} 
                />
            </MuiPickersUtilsProvider>
            <TextField
                margin="dense"
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Duration (min)"
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default AddTraining;