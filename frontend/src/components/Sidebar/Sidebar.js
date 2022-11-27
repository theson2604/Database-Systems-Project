import { useState } from "react";
import './Sidebar.scss'
import { getCustomer, getCustomerStat } from "../../service";

const Sidebar = ({handleData}) => {
    const [selected, setSelected] = useState('')
    
    const handleClick = (type) => {
      let data
      if (type === 'customer') {
        data = getCustomer()
      }
      else {
        data = getCustomerStat('', '')
      }
      handleData([type, JSON.stringify(data)])
      setSelected(type)
    }

    return (
      <div className="menu">
        <div className={(selected==='customer')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('customer')}>Customer information</div>
        <div className={(selected==='static')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('static')}>Statistic information</div>
      </div>
    );
  };
  
  export default Sidebar;