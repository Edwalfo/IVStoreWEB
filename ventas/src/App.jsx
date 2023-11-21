import { Route, Routes } from 'react-router-dom';
import MainLayout from "./layouts/mainlayout/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
// import axios from 'axios';  

// axios.
// defaults.withCredentials = true;

function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<MainLayout/>} />
        <Route path="/admin/*" element={<MainLayout />}>
          {/* Las subrutas dentro de /admin se manejarán en MainLayout */}
        </Route>
      </Routes>

    </>
  );
}

export default App;
