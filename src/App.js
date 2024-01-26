import logo from './logo.svg';
import './App.css';
import Layout from './components/shared/Layout';
import { Route, Routes } from 'react-router-dom';
import AddDepartment from './pages/AddDepartment';
import AllDepartment from './pages/AllDepartment';
import UpdateDepartment from './pages/UpdateDepartment';
import AddEmployee from './pages/AddEmployee';
import AllEmployee from './pages/AllEmployee';
import UpdateEmployee from './pages/UpdateEmployee';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path = "/" element ={<AllDepartment></AllDepartment>}></Route>
        </Routes>  
      <Routes>
        <Route path = "/add-department" element ={<AddDepartment></AddDepartment>}></Route>
      </Routes>
      <Routes>
        <Route path = "/all-department" element ={<AllDepartment></AllDepartment>}></Route>
      </Routes>

      <Routes>
        <Route path = "/update-department/:id" element ={<UpdateDepartment></UpdateDepartment>}></Route>
      </Routes>
      <Routes>
        <Route path = "/add-employee" element ={<AddEmployee></AddEmployee>}></Route>
      </Routes>

      <Routes>
        <Route path = "/all-employee" element ={<AllEmployee></AllEmployee>}></Route>
      </Routes>

      <Routes>
        <Route path = "/update-employee/:id" element ={<UpdateEmployee></UpdateEmployee>}></Route>
      </Routes>
       
      </Layout>
    </div>
  );
}

export default App;
