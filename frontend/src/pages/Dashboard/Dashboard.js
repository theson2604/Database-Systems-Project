import {useState, createContext} from 'react'
import './Dashboard.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from '../../components/Main/Main';

export const backgroundContext = createContext()

function Dashboard() {
    const [data, setData] = useState([])    

    const handleData = (newData = '') => {
        setData(newData)
    }

    return (
        <div className="wrapper">
            <div className='inner'>
                <Sidebar handleData={handleData}/>
                <Main data={data}/>
            </div>
        </div>
    )
}

export default Dashboard;