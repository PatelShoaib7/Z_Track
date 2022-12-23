import logo from './logo.svg';
import './App.css';
import { Login } from './Pages/Login';
import { Route,  Routes } from 'react-router-dom';
import { Home } from './Pages/Home';

function App() {
  return (
    <div className="App">
     
     <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/home" element={<Home />} />
     </Routes>
         
    </div>
  );
}

export default App;
