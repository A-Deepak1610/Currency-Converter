import React, { useEffect, useState } from 'react'
import "../styles/AdminPage.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import Amount from "../store/Store";
export default function AdminPage() {
  const [datas,setDatas]=useState([])
  const [opensuccess, setOpensuccess] =useState("none");
  const navigate=useNavigate()
  
  const { user, setUser, admin, setAdmin } = Amount();
  //Fetch data
  const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:7000/fetch-datas", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error("HTTP Error");
          }
          if (Array.isArray(data.currency)) {
            // console.log(data)
            setDatas(
              data.currency.map((datas) =>[
                datas.currency1,
                datas.currency2,
                datas.in_amount,
                datas.result,
                datas.created_at,
              ])
            );
          } else {
            console.error("Unexpected data format:", data);
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [open, setOpen] = useState(false);
  const [row_id, setrow_id] = useState();

  //Delete data
  const delete_data = async () => {
    const res = await fetch("http://localhost:7000/fetch-datas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const id =data.currency[row_id].id
    try {
      const res = await fetch(`http://localhost:7000/delete-datas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "HTTP Error");
      }
      console.log("Deleted successfully");
      setDatas((prevdata) => prevdata.filter((_, index) => index !== row_id));
      setOpensuccess("block")
      setTimeout(closesuccess, 2000);
    } catch (error) {
      console.error("Delete Error:", error);
    }         
    setOpen(false);
  };
  function closesuccess(){
    setOpensuccess("none")
  }
  const handleClickOpen = (id) => {
    setOpen(true);
    setrow_id(id)
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleSignoutAdmin(){
      navigate('/')
      setUser(false);
      setAdmin(false);
  }
  return (
    
    <div className='adminpage_container'>
        <h1 className='adminpageh1'>Admin Page</h1>
      <div className="successdelete" style={{display:opensuccess}}>Deleted Successfully</div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={delete_data} autoFocus sx={{color:"red"}}>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
      <div className="table_info">
      <table id="marktable" className="marktable" border="1">
          <thead>
            <tr>
              <th>Currecny1</th>
              <th>Currency2</th>
              <th>Input Amout</th>
              <th>Result</th>
              <th>Converted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {datas.map((datas, rowIndex) => (
              <tr key={rowIndex}>
                  {datas.map((mark, colIndex) => (
                  <td key={colIndex}>{mark}</td>
                ))}
                <td className='delete'><button onClick={() => handleClickOpen(rowIndex)}>Delete</button></td>
              </tr> 
             ))}
          </tbody>
        </table>
      </div>
          <button className="signoutadmin" onClick={handleSignoutAdmin} >
          <i className="fa-solid fa-right-from-bracket"></i>Signout
        </button>
    </div>
  )
}
