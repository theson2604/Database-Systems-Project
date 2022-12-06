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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCustomerStat } from "../../service";


const setTitle = () => {
  return ['Month', 'Total customers']
}
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
 
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
          // setBranch(data.Branch[0])
          // setYear(data.Year[0])
         
        })
      }
     
      }, 
    );
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const getStat = await getCustomerStat(branch, year);
      if (getStat.length)
        for (let i = 0; i < 12 ; i++ ) {
          if (getStat[i]?.Month != i+1)
            getStat.splice(i, 0, {"Month": i+1, "Total_customers": 0})
        }
        console.log(getStat)
        setInfo(getStat)

    }

    return ( 
      <>
    <div className="table">
        <h3>{'Statistic information of branch'}</h3>
        
        {viewBranch && <FormControl sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="select-branch">Branch</InputLabel>
          <Select
            labelId="select-branch"
            id="select-branch"
            
            label="Branch"
            onChange={e => {setBranch(e.target.value); setInfo([])}}
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
            onChange={e => {setYear(e.target.value); setInfo([])}}
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
            
        
        {/* <TableContainer
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
              {!info && <TableRow><TableCell align="center" colSpan={2}><h2>Chưa có dữ liệu</h2></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer> */}
        </div>
         {info?.length !== 0 && <div>
          <h3>{`Customer Statistic At Branch CN${branch} In The Year Of ${year}`}</h3>
         <ResponsiveContainer width="99%" aspect={3}>
          
        <BarChart
          width={1100}
          height={600}
          data={info}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
      
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis name="Month" dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend/>
          <Bar name="Total Customer" dataKey="Total_customers" fill="#8884d8" />
         
        </BarChart>
      </ResponsiveContainer>
      </div>
      }
     
    </>
    );
}

export default StatTable;