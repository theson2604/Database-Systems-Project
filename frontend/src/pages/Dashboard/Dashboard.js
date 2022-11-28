import {useState, createContext} from 'react'
import './Dashboard.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import Main from '../../components/Main/Main';

export const BackgroundContext = createContext()

function Dashboard() {
    const [data, setData] = useState([])    
    const [background, setBackground] = useState(false)

    const handleData = (newData = '') => {
        setData(newData)
    }

    return (
        <BackgroundContext.Provider value={setBackground}>
            <div className="wrapper" style={{background: (background) && 'rgba(0,0,0,0.4)'}}>
                <div className='inner'>
                    <Sidebar handleData={handleData}/>
                    <Main data={data}/>
                </div>
            </div>
        </BackgroundContext.Provider>
    )
}

export default Dashboard;