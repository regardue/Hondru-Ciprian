import React, {useState} from 'react';
import {Autocomplete, Button, TextField} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
// import { useNavigate } from 'react-router-dom';

const Home = () => {
    // const nav = useNavigate()
    

    const handleDelete = (row) =>{
        setRows(rows.filter(x=>x.id!==row.id))
    }

    const options=[
        {label:"Bucuresti"},
        {label:"Iasi"},
        {label:"Oradea"},
        {label:"Cluj"},
    ]
    const [newOptions, setOptions] = useState(options);
    const [nume,setNume]=useState("");
    

    const columns = [
        {field:"id",headerName:'ID',width:70},
        {field:"firstName",headerName:'First Name',width:150},
        {field:"lastName",headerName:'Last Name',width:150},
        {
            field:'fullName',
            headerName:'Full Name',
            description:'Description',
            width:300,
            valueGetter:(value,row) => `${row.firstName || ''} ${row.lastName || ''}`,
            sortable:false
        },
        {field:"action",headerName:'Actions',sortable:false,renderCell:({row})=><Button onClick={()=>handleDelete(row)}>Test</Button>}
    ]

    const data =[
        {id:1,lastName:"Radu",firstName:"Tiberiu"},
        {id:2,lastName:"Onel",firstName:"Horia"},
        {id:3,lastName:"Radu",firstName:"Tiberiu"},
        {id:4,lastName:"Onel",firstName:"Horia"},
        {id:5,lastName:"Radu",firstName:"Tiberiu"},
        {id:6,lastName:"Onel",firstName:"Horia"}
    ]
    const [rows,setRows]=useState(data)

    const handleClick =()=>{
        // options.push({label:"Constanta"});
        setOptions((oldOptions) => [...oldOptions,{label:nume}])
    }
    return (
        <div>
            {/* <h1>Welcome to the Home page!</h1>
            Add your content here
            <button onClick={()=>{nav('/profile')}}>Test</button> */}

            <Button variant='outlined' color='error' size='large' onClick={handleClick}>Test</Button>
            <TextField
            required
            error
            id="nume"
            label="Nume:"
            // defaultValue={"Tiberiu"}/>
            onChange={(e)=>{setNume(e.target.value)}}/>
            <Autocomplete
            disablePortal
            id='combo-box'
            options={newOptions}
            sx={{width:300}}
            renderInput={(params)=><TextField{...params} label="Orase:"/>}
            />
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination:{paginationModel:{page:0,pageSize:5}}
            }}
            checkboxSelection />
        </div>
    );
};

export default Home;