import { useState } from "react";
import './Sidebar.scss'
import { logout } from "../../service";
import { useNavigate } from "react-router-dom";
// import { getCustomer, getCustomerStat } from "../../service";

const Sidebar = ({handleData, setToken}) => {
    const [selected, setSelected] = useState('customer')
    const navigate = useNavigate()
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

    const signout = async () => {
      const res = await logout()
      console.log("clieck")
      setToken(res)
      navigate("/")
    }

    return (
      <div className="menu">
        <div className={(selected==='customer')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('customer')}>Customer information</div>
        <div className={(selected==='static')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('static')}>Statistic information</div>
        <div className={(selected==='add')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('add')}>Add room</div>
        <div className={(selected==='search')? 'menuItem active' : 'menuItem'} onClick={() => handleClick('search')}>Search customer information</div>
        <div className={'menuItem menuItem-logout'} onClick={signout}>Log out</div>
      </div>
    );
  };
  
  export default Sidebar;