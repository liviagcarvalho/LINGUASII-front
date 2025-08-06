import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/AjudaSobre";
// import AulasPage from "./pages/AulasPage";
import LoginPage from "./pages/Login";
import ProfessorLoginPage from "./pages/ProfessorLoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/professor-login" element={<ProfessorLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
    </Router>
  );
}

export default App;