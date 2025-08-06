import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.section`
  background-color: #32004b;
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  font-family: "Poppins", sans-serif;
  border-radius: 12px;
  max-width: 900px;
  margin: 4rem auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const RegisterLink = styled(Link)`
  background: white;
  color: #32004b;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    background: #f3e7ff;
    transform: scale(1.03);
  }
`;

const ChamadaParaAcao: React.FC = () => {
  return (
    <Container>
      <Title>Não deixe mais oportunidades escaparem</Title>
      <Subtitle>
        Domine o inglês corporativo e conquiste a carreira que você merece! <br />
        Inscreva-se agora e dê o próximo passo rumo ao seu sucesso.
      </Subtitle>
      <RegisterLink to="/register">REGISTRE-SE AQUI</RegisterLink>
    </Container>
  );
};

export default ChamadaParaAcao;
