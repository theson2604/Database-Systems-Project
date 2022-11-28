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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button } from "@mui/material";
import { getCustomerStat } from "../../service";


  const setTitle = () => {
    return ['Month', 'Total customers']
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
        fetch('/branchyear', {
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
        
        {viewBranch && <FormControl sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="select-branch">Branch</InputLabel>
          <Select
            labelId="select-branch"
            id="select-branch"
            
            label="Branch"
            onChange={e => setBranch(e.target.value)}
          >
          
          {viewBranch.map((id, idx)=> {
            
            return <MenuItem value={id}>CN{id}</MenuItem>
            }
          )}
          </Select>
          </FormControl>
        }
        {viewYear && <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-branch">Year</InputLabel>
          <Select
            labelId="select-year"
            id="select-year"
            
            label="year"
            onChange={e => setYear(e.target.value)}
          >
          
          {viewYear.map((id, idx)=> {
            
            return <MenuItem value={id}>{id}</MenuItem>
            }
          )}
          </Select>
          </FormControl>
        }
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Button variant="contained" color="inherit" size="large" onClick={handleSubmit} sx={{ marginLeft: "auto" }}>
              Look up
          </Button>
        </FormControl>
            
        
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
              {!info && <TableRow><TableCell align="center" colSpan={2}><b>Chưa có dữ liệu</b></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
    </div> 
    );
}

export default StatTable;