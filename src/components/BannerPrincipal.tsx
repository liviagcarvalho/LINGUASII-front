import styled from "styled-components";
import Capa from "../assets/HomePage/CapaHome.png";

const Banner = styled.section`
  width: 100%;
  height: 550px;
  background-image: url(${Capa});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  top: 18%; /* move o conteúdo mais para cima */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #1e1e2f;
`;

const TituloBanner = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const BotaoBanner = styled.button`
  background-color: #6a0dad;
  color: white;
  padding: 0.45rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const BannerPrincipal = () => {
  return (
    <Banner>
      <BannerContent>
        <TituloBanner>
          Explore Seu Potencial <br />
          Encontre O Curso Ideal Para Você
        </TituloBanner>
        <BotaoBanner>Visite As Aulas</BotaoBanner>
      </BannerContent>
    </Banner>
  );
};

export default BannerPrincipal;

