import AddRoom from '../AddRoom/AddRoom';
import Search from '../Search/Search';
import StatTable from '../Stat/Stat';
import Customer from '../Customer/Customer'
import './Main.scss'

function Main({data}) {

    function createData(Customer_id, Customer_type, Fullname, Email, Phone, Username, Password, Ssn, Score) {
        return { Customer_id, Customer_type, Fullname, Email, Phone, Username, Password, Ssn, Score };
      }
      
      const rows = [
        createData("Lasania Chiken Fri", 18908424, "Nguyen van a", "Approved", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
        createData("Big Baza Bang ", 18908424, "Nguyen van b", "Pending", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
        createData("Mouth Freshner", 18908424, "Nguyen van c", "Approved", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
        createData("Cupcake", 18908421, "Nguyen van d", "Delivered", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
      ];

    let Page
    if (data[0] === 'search') {
        Page = Search
        data[1] = rows
    }
    else if (data[0] === 'add') Page = AddRoom
    else if (data[0] === 'static') Page = StatTable
    else Page = Customer

    console.log(data)

    return ( 
        <div className='Main'>
            <h1>Dashboard</h1>
            {(data.length !== 0) && <Page data={data}/>}
        </div>
    );
}

export default Main;