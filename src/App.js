import logo from './logo.svg';
import './App.css';
import { Login } from './Pages/Login';
import { Route,  Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Location } from './Pages/Location';

function App() {
  return (
    <div className="App">
     
     <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/home" element={<Home />} />
       <Route path="/location/:id" element={<Location />}/>
     </Routes>
         
    </div>
  );
}

export default App;
