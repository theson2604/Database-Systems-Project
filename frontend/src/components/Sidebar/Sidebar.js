import { useState } from "react";
import './Sidebar.scss'
// import { getCustomer, getCustomerStat } from "../../service";

const Sidebar = ({handleData}) => {
    const [selected, setSelected] = useState('customer')
    
    const handleClick = (type) => {
      let data = '123'
      if (type === 'customer' || type === 'search') {
        // data = getCustomerStat()
        console.log(type)
      }
      else if (type === 'static'){
        // data = getCustomerStat('', '') //put year, branch_id
        console.log(type)
      }else {}
      handleData([type, data])
      setSelected(type)
    }

    return (
      <div className="menu">
        <div className={(selected==='customer')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('customer')}>Customer information</div>
        <div className={(selected==='static')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('static')}>Statistic information</div>
        <div className={(selected==='add')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('add')}>Add room</div>
        <div className={(selected==='search')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('search')}>Search customer information</div>
      </div>
    );
  };
  
  export default Sidebar;