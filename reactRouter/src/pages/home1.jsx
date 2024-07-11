import React, {useState} from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'

const Home1 = () => {

    

    const handleDelete = (row) => {
        setRows(rows.filter(x=>x.id!==row.id))
    }

    const handleEdit = (row) => {
        setEditRow(row);
        setIsEditModalOpen(true);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditRow({ ...editRow, [name]: value });
    }

    const handleEditSubmit = () => {
        setRows(rows.map(row => row.id === editRow.id ? editRow : row));
        setIsEditModalOpen(false);
        setEditRow(null);
    }
    
    const [nume,setNume] = useState("");
    const [prenume,setPrenume] = useState("");
    const [facultate,setFacultate] = useState("");

    const [rows, setRows] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);

    const columns = [
        {field:"id",headerName:'ID',width:70},
        {field:"nume",headerName:'Nume',width:150},
        {field:"prenume",headerName:'Prenume',width:150},
        {field:"facultate",headerName:'Facultate',width:150},
        {field:"delete",headerName:'Delete',sortable:false,renderCell:({row})=><Button onClick={()=>handleDelete(row)}>Delete</Button>},
        {field:"edit",headerName:'Edit',sortable:false,renderCell:({row})=><Button onClick={()=>handleEdit(row)}>Edit</Button>}
    ]

    const handleClick = () => {
        if(nume && prenume && facultate){
        const newRow = {
            id: rows.length + 1,
            nume: nume,
            prenume: prenume,
            facultate: facultate
        };
        setRows([...rows, newRow]);
        setNume("");
        setPrenume("");
        setFacultate("");
    }
    else{
        alert("All fields are required!");
    }
    }


    return(
        <div>
            <h1>Welcome to my table!</h1>
            
            <TextField
            required
            success
            id="nume"
            label="Nume:"
            value={nume}
            onChange={(e)=>{setNume(e.target.value)}}/>
            <TextField
            required
            success
            id="prenume"
            label="Prenume:"
            value={prenume}
            onChange={(e)=>{setPrenume(e.target.value)}}/>
            <TextField
            required
            success
            id="facultate"
            label="Facultate:"
            value={facultate}
            onChange={(e)=>{setFacultate(e.target.value)}}/>
            <Button variant='outlined' color='success' size='large' onClick={handleClick}>Adauga</Button>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{pagination:{paginationModel:{page:0,pageSize:5}}}}
            pageSizeOptions={[5, 10]}
            checkboxSelection />
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <DialogTitle>Edit Row</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        name="nume"
                        label="Nume:"
                        value={editRow?.nume || ""}
                        onChange={handleEditChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        required
                        name="prenume"
                        label="Prenume:"
                        value={editRow?.prenume || ""}
                        onChange={handleEditChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        required
                        name="facultate"
                        label="Facultate:"
                        value={editRow?.facultate || ""}
                        onChange={handleEditChange}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default Home1;
