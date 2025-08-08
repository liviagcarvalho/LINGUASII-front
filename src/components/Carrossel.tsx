import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import AulaCard from "./AulaCard";

// Título em fundo branco
const TitleWrapper = styled.div`
  background: white;
  padding: 4rem 3rem 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.7rem;
  color: #300244;
  text-align: left;
`;

// Fundo roxo claro da seção
const CarouselWrapper = styled.section`
  background: #F8F5F5;
  padding: 3rem 0;
  width: 100%;
  position: relative;
`;

// Container centralizado para os cards
const CarouselContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Setas com posição fixa nas bordas da tela
const CustomNavButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 40%;
  background-color: rgba(255, 255, 255, 0.85);
  color: #39004d;
  font-size: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: #39004d;
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PrevButton = styled(CustomNavButton)`
  left: 1.5rem;
`;

const NextButton = styled(CustomNavButton)`
  right: 1.5rem;
`;

const AulasPopularesCarousel = () => {
  const aulas = [
    {
      title: "Etiqueta Digital",
      duration: "7h30mins",
      img: "src/assets/carrossel/EtiquetaDigital.png",
    },
    {
      title: "Marketing",
      duration: "3hs50mins",
      img: "src/assets/carrossel/Marketing.png",
    },
    {
      title: "Finanças e Contabilidade",
      duration: "1h12mins",
      img: "src/assets/carrossel/Financas.png",
    },
    {
      title: "Conversação Profissional",
      duration: "2h40mins",
      img: "src/assets/carrossel/Conversacao.png",
    },
  ];

  return (
    <>
      <TitleWrapper>
        <Title>Aulas Mais Populares</Title>
      </TitleWrapper>

      <CarouselWrapper>
        <PrevButton className="swiper-button-prev">‹</PrevButton>
        <NextButton className="swiper-button-next">›</NextButton>

        <CarouselContainer>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {aulas.map((aula, index) => (
              <SwiperSlide key={index}>
                <AulaCard {...aula} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CarouselContainer>
      </CarouselWrapper>
    </>
  );
};

export default AulasPopularesCarousel;
