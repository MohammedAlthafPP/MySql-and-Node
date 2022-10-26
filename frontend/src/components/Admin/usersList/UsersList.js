import React, { Fragment } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { clearErrors, deleteUser, getAllUsers } from "../../../Redux/actions/userAction";
import swal from 'sweetalert';
import {toast } from 'react-toastify';
import "./UserList.css";
import { DELETE_USER_RESET } from "../../../Constants/Constants";





function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const { error, users} = useSelector((state)=> state.allUsers);
  const { error:deleteError, isDeleted,message} = useSelector((state)=> state.userListAction);


  useEffect(() => {
    if(error){
      toast.error(error.message);
      dispatch(clearErrors())
    }
    if(deleteError){
      toast.error(deleteError.message);
      dispatch(clearErrors())
    }

    if(isDeleted) {
      toast.success(message);
      dispatch({type:DELETE_USER_RESET});
      navigate(`/admin`);

      
    }

    dispatch(getAllUsers())
  }, [dispatch,error,message,isDeleted,navigate,deleteError])
  
  

  const columns = [
    {field : "id", headerName : "User ID", minWidth: 200, flex: 0.8},
    {field : "email", headerName : "Email", minWidth: 350, flex: 1},
    {field : "name", headerName : "Name", minWidth: 150, flex: 0.5,},
    {field : "phone", headerName : "Contact", minWidth: 150, flex: 0.5,},
    {field : "role", headerName : "Role", minWidth: 270, flex: 0.3},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,type:"number",sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          <Button onClick={() => handleShow(params.getValue(params.id,"id"),params.getValue(params.id,"name"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  users && users.forEach((item) => {
    rows.push({
      id:item.id,
      role: item.role,
      email:item.email,
      name : item.name,
      phone : item.phone,
    })
  })



const handleShow = (id,name) =>{
  swal({
    title: "Are you sure?",
    text: `Once deleted, you will not be able to recover this ${name}'s details!`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteUser(id));
     
     
    } else {
      
    }
  });
}


  return (
    <Fragment>
     <div className="UsersListContainer">
           <h1 id="UsersListHeading">ALL USERS</h1>
           <DataGrid 
           rows={rows}
           columns={columns}
           pageSize={10}
           disableSelectionOnClick
           className="UsersListTable"
           autoHeight
           />
         </div>

    </Fragment>
  )
}


export default UsersList