import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Admin/Login";
import { ToastContainer } from "react-toastify";
import SurahManagementModal from "./Admin/AdminDashboard";
import SurahListPage from "./pages/SurahListPage";
import SurahDetailPage from "./pages/SurahDetailPage";
import AddSurahModal from "./Admin/AddSurahModal";
import AyatDetailPage from "./pages/AyatDetailPage";

function App() {
  return (
    <>
      <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/surah' element={<SurahListPage/>}/>
          <Route path="/surah/:id" element={<SurahDetailPage />} />
          <Route path="/add" element={<AddSurahModal />} />
          <Route path="/ayat/:ayatId" element={<AyatDetailPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
