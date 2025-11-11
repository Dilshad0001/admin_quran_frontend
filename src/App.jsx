import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Admin/Login";
import { ToastContainer } from "react-toastify";
import SurahManagementModal from "./Admin/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/Dashboard' element={<SurahManagementModal/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
