import React from "react";
import styled from "styled-components";
import imgBanner from "../assets/HomePage/EquipeProfissional.png";

const Section = styled.section`
  width: 100%;
  background: #fff;
  font-family: "Poppins", sans-serif;
  margin-top: 4rem;
`;

const TitleWrapper = styled.div`
  text-align: center;
  padding: 2rem 1rem 1rem;
`;

const Title = styled.h2`
  color: #32004b;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  overflow: visible; /* Adicionado */

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;


const ImageBlock = styled.div`
  flex: 1.1;
  display: flex;
  justify-content: flex-start;
  position: relative; /* Adicionado para permitir controle com z-index */
  z-index: 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 700px;
  height: auto;
  object-fit: cover;
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  position: relative; /* Adicionado para respeitar z-index */
  z-index: -1;

  @media (max-width: 768px) {
    border-radius: 8px;
    max-width: 90%;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  padding: 1rem 4rem 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #000;
  line-height: 1.6;
  text-align: justify;
`;

const Divider = styled.div`
  position: absolute;
  bottom: 40px; /* Mais sobreposto */
  left: 0;
  width: 100%;
  height: 100px; /* Gradiente mais alto */
  z-index: 2;
  background: linear-gradient(to bottom, transparent, #2f0147);
  pointer-events: none;

`;

const Bottom = styled.div`
  background: #2f0147;
  padding: 3rem 2rem 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  position: relative;  /* Novo */
  z-index: 3;           /* Mais alto que o da imagem (0) e do Divider (2) */
  margin-top: -40px;    /* Sobrepõe a imagem */
`;


const Card = styled.div`
  background: #fffafb;
  border-radius: 12px;
  padding: 2rem;
  max-width: 320px;
  min-height: 220px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1.1rem;
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  p {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.4;
  }
`;

const VerticalBar = styled.div`
  width: 8px;
  height: 3rem; 
  background-color: #6f00a9;
  border-radius: 1px;
`;



const ProfissionalSection: React.FC = () => {
  return (
    <Section>
      <TitleWrapper>
        <Title>Comunique-se Profissionalmente desde a primeira aula</Title>
      </TitleWrapper>

      <ContentWrapper>
        <ImageBlock>
          <Image src={imgBanner} alt="Profissionais comemorando" />
        </ImageBlock>
        <TextBlock>
          <Description>
          Tenha a experiência completa do método LinguaLab: uma abordagem inovadora
          que une conversação prática, exercícios direcionados e um plano de desenvolvimento
          personalizado. Desde a primeira aula, você será exposto a situações reais do ambiente profissional, 
          ganhando segurança, vocabulário técnico e fluência com rapidez.
          </Description>
        </TextBlock>
        <Divider />
      </ContentWrapper>

      <Bottom>
      <Card>
        <h4>
            <VerticalBar />
            Módulos focados na sua área de atuação profissional
        </h4>
        <p>
            Aprenda com conteúdos voltados para o seu setor de trabalho, com
            vocabulário e situações reais da sua rotina profissional.
        </p>
        </Card>

        <Card>
        <h4>
            <VerticalBar />
            Fluência rápida com exercícios práticos a todo momento
        </h4>
        <p>
            Desenvolva sua comunicação com atividades dinâmicas e interativas
            que simulam contextos do dia a dia profissional.
        </p>
        </Card>

        <Card>
        <h4>
            <VerticalBar />
            Acesso a chat de conversas e dúvidas com nossos profissionais
        </h4>
        <p>
            Tire dúvidas em tempo real e pratique conversação com nossos
            professores sempre que precisar.
        </p>
        </Card>

      </Bottom>
    </Section>
  );
};

export default ProfissionalSection;
