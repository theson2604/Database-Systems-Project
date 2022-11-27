import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/db' element={<Dashboard/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
