import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Stat.scss";
import { getCustomerStat } from "../../service";


  const setTitle = () => {
    return ['Month', 'Total_customers']
  }

  const makeStyle=(status)=>{
    if(status === 'Approved')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if(status === 'Pending')
    {
      return{
        background: '#ffadad8f',
        color: 'red',
      }
    }
    else{
      return{
        background: '#59bfff',
        color: 'white',
      }
    }
  }

function StatTable() {
    
    const [viewBranch, setViewBranch] = useState()
    const [viewYear, setViewYear] = useState()
    const [branch, setBranch] = useState()
    const [year, setYear] = useState()
    const [info, setInfo] = useState()
    // if (info === '' || info === undefined || info === null) return 
    
    const titles = setTitle()
    // const rows = info
 
    useEffect(() => {
      if (!viewBranch) {
        fetch('http://localhost:3000/branchyear', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'same-origin',
        })
        .then(res => res.json())
        .then(data => {
          setViewBranch(data.Branch)
          setViewYear(data.Year)
          setBranch(data.Branch[0])
          setYear(data.Year[0])
         
        })
      }
     
      }, 
    );
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const getStat = await getCustomerStat(branch, year);
      setInfo(getStat)

    }

    return ( 
    <div className="table">
        <h3>{'Statistic information of branch'}</h3>
        <form onSubmit={handleSubmit}>
        {viewBranch && 
          <select name="branch" onChange={e => setBranch(e.target.value)}>
          {viewBranch.map((id, idx)=> {
            
            return <option key={idx} value={id} >CN{id}</option>
            }
          )}
          </select>
        }
        {viewYear && 
          <select name="year" onChange={e => setYear(e.target.value)}>
          {viewYear.map((id, idx)=> {
           
            return <option key={idx} value={id}>{id}</option>
        })}
          </select>
        }
            <button type="submit">View</button>
        </form>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem'}}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" >{titles[0]}</TableCell>
                <TableCell  align='center'>{titles[1]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white", overflowY: 'scroll' }}>
              {info && info.map((row) => {
              return (
                <TableRow
                  key={row.Month}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" align="center" scope="row">
                    {row.Month}
                  </TableCell>
                  <TableCell align="center">{row.Total_customers}</TableCell>
                </TableRow>
              )})}
              {!info && <TableRow><TableCell align="center"><b>Chưa có dữ liệu</b></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
    </div> 
    );
}

export default StatTable;