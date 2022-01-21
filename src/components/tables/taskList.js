import MaterialTable from "material-table";
import React, {  Fragment, useEffect, useState } from "react";
import axios from "axios";

import './list.css';
import { forwardRef } from 'react';

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


export default function TList() {

    const [entries, setEntries] = useState({
        data: [
            {
                _id: "",
                name: '',
                resource: '',
                description: '',
                createdBy: '',
                createdAt: '',
                assignedTo: '',
                isCompleted: '',
                dueDate: '',
                startDate: '',
                endDate: '',
                duration: '',
                percentDone: '',
                dependencies: '',
            } 
        ]   
    });

    const [state] = React.useState({
        columns: [
            { title: "Task Id", field: "_id", hidden: true },
            { title: "Name", field: "name", draggable: true },
            { title: "Resource", field: "resource", draggable: true },
            { title: "Description", field: "description", type: "text", multiline: true, draggable: true },
            { title: "Created By", field: "createdBy", draggable: true },
            { title: "Created At", field: "createdAt", editable: "never", hidden: true, draggable: true },
            { title: "Assigned To", field: "assignedTo", draggable: true },
            { title: "is Completed", field: "isCompleted", type: "boolean", default: "false", draggable: true },
            { title: "Due Date", field: "dueDate", type: "date", draggable: true },
            { title: "Start Date", field: "startDate", type: "date", draggable: true },
            { title: "End Date", field: "endDate", type: "date", draggable: true },
            { title: "Duration", field: "duration", type: "", draggable: true },
            { title: "Percent Done", field: "percentDone", type: "number", draggable: true },
            { title: "Dependencies", field: "dependencies", type: "array", draggable: true },
        ]

    });

    useEffect(() => {
        axios
        .get("http://localhost:4000/tasks")
        .then(response => {
        let data = [];
    response.data.forEach(el => {
        data.push({
        _id: el._id,
        name: el.name,
        resource: el.resource,
        description: el.description,
        createdBy: el.createdBy,
        //createdAt: el.createdAt,
        assignedTo: el.assignedTo,
        isCompleted: el.isCompleted,
        dueDate: el.dueDate,
        startDate: el.startDate,
        endDate: el.endDate,
        duration: el.duration,
        percentDone: el.percentDone,
        dependencies: el.dependencies,
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
    title="Task Table"
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
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          },
        filtering: true,
        grouping: true
      }}

    editable={{


        onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    /* setData([...data, newData]); */
                    resolve();
                    const data = [...entries.data];
                  
                    axios.post('http://localhost:4000/tasks/create-task', newData)
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

            axios.put(`http://localhost:4000/tasks/update-task/${oldData._id}`, newData)
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
               
            axios.delete(`${'http://localhost:4000/tasks/delete-task'}/${oldData._id}`)
                
                .then((res) => {
                    console.log('task successfully deleted!')
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