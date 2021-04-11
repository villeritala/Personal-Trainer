import React, { useState } from 'react';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
      setValue(value);
};

  return (
    <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
          PERSONAL TRAINER
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Customers" value="one" />
          <Tab label="Trainings" value="two" />
      </Tabs>
      </Toolbar>
    </AppBar>
    {value==='one' && <div><Customers/></div>}
    {value==='two'&& <div><Trainings/></div>}

  </div>
  );
}

export default App;
