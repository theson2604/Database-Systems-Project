import InfoTable from '../Table/Table';
import './Main.scss'

function Main({data}) {
    return ( 
        <div className='Main'>
            <h1>Dashboard</h1>
            <InfoTable data={data}/>
        </div>
    );
}

export default Main;