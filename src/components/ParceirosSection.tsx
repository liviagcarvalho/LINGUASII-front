import React from "react";
import styled from "styled-components";
import parceirosTop from "../assets/HomePage/Parceiros2.png";
import parceirosBottom from "../assets/HomePage/Parceiros1.png";

const Section = styled.section`
  width: 100%;
  background: #fff;
  padding: 4rem 2rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

const ImageRow = styled.img`
  width: 100%;
  max-width: 1000px;
  margin: 1rem auto;
  display: block;
`;

const ImageRow2 = styled.img`
  width: 100%;
  max-width: 900px;
  margin: 1rem auto;
  display: block;
`; 

const TextWrapper = styled.div`
  margin: 3rem 0 2rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #32004b;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #1c1c1c;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
`;

const ParceirosSection: React.FC = () => {
  return (
    <Section>
      <ImageRow src={parceirosTop} alt="Parceiros - linha superior" />

      <TextWrapper>
        <Title>Profissionais que crescem praticando inglês e espanhol todos os dias</Title>
        <SubText>
          Executivos, analistas, coordenadores e líderes que utilizam o inglês como ferramenta para alavancar suas carreiras.
        </SubText>
      </TextWrapper>

      <ImageRow2 src={parceirosBottom} alt="Parceiros - linha inferior" />
    </Section>
  );
};

export default ParceirosSection;
