import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import useToken from './hooks/useToken';

function App() {

  const { token, setToken } = useToken();

  

  return (
    <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login tokener={token} setToken={setToken} />}/>
            <Route path='/db' element={<Dashboard token={token} setToken={setToken} />}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
