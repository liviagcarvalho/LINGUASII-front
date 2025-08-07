// src/pages/HomePageLogado.tsx
import React from "react";
import HeaderLogado from "../components/HeaderLogado";
import SearchBar from "../components/SearchBar"; 
import Banner from "../components/BannerPrincipal"; 
import MissaoSection from "../components/MissaoSection"; 
import AulasPopularesCarousel from "../components/Carrossel";
import ProfissionalSection from "../components/ProfissionalSection";
import ParceirosSection from "../components/ParceirosSection"; 
import ChamadaParaAcao from "../components/ChamadaParaAcao"; 
import Footer from "../components/Footer";

const HomePageLogado = () => {
  return (
    <>
      <HeaderLogado />
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

export default HomePageLogado;