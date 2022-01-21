import MaterialTable from "material-table";
import React, {  Fragment, useEffect, useState } from "react";
import axios from "axios";

import './userList.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default function UserTable() {

    const [entries, setEntries] = useState({
        data: [
            {
                _id: "",
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            } 
        ]   
    });

    const [state] = React.useState({
        columns: [
            { title: "User Id", field: "_id", hidden: true},
            { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.firstName} />  },
            { title: "First Name", field: "firstName", draggable: true  },
            { title: "Last Name", field: "lastName", draggable: true  },
            { title: "Email", field: "email", type: "email",  draggable: true },
            { title: "Password", field: "password", type: "password" }
        ]

    });

    useEffect(() => {
        axios
        .get("http://localhost:4000/users")
        .then(response => {
        let data = [];
    response.data.forEach(el => {
        data.push({
        _id: el._id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        password: el.password
    });
});
    setEntries({ data: data });
})
.catch(function(error) {
        console.log(error);
    });
}, []);



    return (

        <Fragment>

        <MaterialTable
    title="User Table"
    columns={state.columns}
    data={entries.data}
    icons={tableIcons}
    stickyHeader

      options={{
        exportButton: true,
        emptyRowsWhenPaging: false,
        exportAllData: true,
        maxBodyHeight: 440,
        minBodyHeight: 340,
        padding: 'dense',
        actionsColumnIndex: -1
      }}

    editable={{


        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    /* setData([...data, newData]); */
                    resolve();
                    const data = [...entries.data];
                  
                    axios.post('http://localhost:4000/users/signup', newData)
                    .then((res) => {
                        console.log(res.data)
                    }).catch((error) => {
                        console.log(error)
                    });
                    
                setEntries({ ...entries, data });
            }, 600);
        }),




        onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data[data.indexOf(oldData)] = newData;

            axios.put(`http://localhost:4000/users/update-user/${oldData._id}`, newData)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })    

                setEntries({ ...entries, data });
            }, 600);
        }),

        onRowDelete: oldData =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data.splice(data.indexOf(oldData), 1);
               
            axios.delete(`${'http://localhost:4000/users/delete-user'}/${oldData._id}`)
                
                .then((res) => {
                    console.log('User successfully deleted!')
                }).catch((error) => {
                    console.log(error)
                })
            setEntries({ ...entries, data });
        }, 600);
    })

    }}
    />

</Fragment>  

);
}