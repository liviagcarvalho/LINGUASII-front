// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import SobrePage from "./pages/AjudaSobre";
// // import AulasPage from "./pages/AulasPage";
// import LoginPage from "./pages/Login";
// import ProfessorLoginPage from "./pages/ProfessorLoginPage";
// import RegisterPage from "./pages/RegisterPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/professor-login" element={<ProfessorLoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/sobre" element={<SobrePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/AjudaSobre";
import LoginPage from "./pages/Login";
import ProfessorLoginPage from "./pages/ProfessorLoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePageLogado from "./pages/HomePageLogado";
import PerfilAluno from "./pages/PerfilAluno";
import ComprasAluno from "./pages/ComprasAluno";
import PagamentoPix from "./pages/PagamentoPix";
//import SobrePageLogado from "./pages/AjudaSobreLogado";
import AulasPublica from "./pages/CatalogoAulas";
//import AulasPageLogado from "./pages/CatalagoAulasLogado";
import PerfilProf from "./pages/PerfilProfessor";
import Reservas from "./pages/Reservas";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/professor-login" element={<ProfessorLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/home-logado" element={<HomePageLogado />} />
          <Route path="/perfil" element={<PerfilAluno />} />
          <Route path="/compras" element={<ComprasAluno />} />
          <Route path="/pagamento" element={<PagamentoPix />} />
          <Route path="/aulas" element={<AulasPublica />} />
          <Route path="/perfil-professor" element={<PerfilProf />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


