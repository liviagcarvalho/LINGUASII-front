// src/pages/HomePage.tsx
import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; 
import Banner from "../components/BannerPrincipal"; 
import MissaoSection from "../components/MissaoSection"; 
import AulasPopularesCarousel from "../components/Carrossel";
import ProfissionalSection from "../components/ProfissionalSection";
import ParceirosSection from "../components/ParceirosSection"; 
import ChamadaParaAcao from "../components/ChamadaParaAcao"; 
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <MissaoSection />
      <AulasPopularesCarousel />
      <ProfissionalSection />
      <ParceirosSection />
      <ChamadaParaAcao />
      <Footer />
      
    </>
  );
};

export default HomePage;