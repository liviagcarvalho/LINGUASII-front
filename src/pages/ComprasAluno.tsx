import React from "react";
import styled from "styled-components";
import HeaderLogado from "../components/HeaderLogado";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ComprasAluno = () => {
  const navigate = useNavigate();

  const pacotes = [
    { creditos: 1, preco: "R$59,90" },
    { creditos: 5, preco: "R$299,90" },
    { creditos: 10, preco: "R$499,90" },
    { creditos: 30, preco: "R$1.199,90" },
    { creditos: 60, preco: "R$1.999,90" },
  ];

  return (
    <>
      <HeaderLogado />

      <Section>
        <Title>NOSSOS PACOTES</Title>
        <CardsGrid>
          {pacotes.map((pacote, index) => {
            const precoNumerico = Number(pacote.preco.replace("R$", "").replace(",", "."));
            const precoPorCredito =
              pacote.creditos > 1 ? (precoNumerico / pacote.creditos).toFixed(2) : null;

            return (
              <PacoteCard key={index}>
                <h3>{pacote.creditos} crédito{pacote.creditos > 1 && "s"}</h3>
                <p>{pacote.preco}</p>
                {precoPorCredito && <span>R${precoPorCredito} por crédito</span>}
                <button onClick={() => navigate("/pagamento", { state: pacote })}>Comprar</button>
              </PacoteCard>
            );
          })}
        </CardsGrid>
      </Section>

      <Footer />
    </>
  );
};

export default ComprasAluno;

// ========== Styled Components ==========



const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #39004d;
  margin-bottom: 4.5rem;
  text-align: center;
`;

const Section = styled.section`
  width: 100%;
  min-height: auto; /* não força altura grande */
  padding: 6rem 5vw 0rem; /* reduz padding inferior */
  background-color: #fff;
  font-family: "Poppins", sans-serif;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  margin-bottom: 7rem; /* menor espaçamento abaixo dos cards */
`;


const PacoteCard = styled.div`
  background-color: #39004d;
  color: white;
  border-radius: 16px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  p {
    font-size: 1.05rem;
    margin-bottom: 0.3rem;
    text-align: center;
  }

  span {
    font-size: 0.85rem;
    color: #ccc;
    margin-bottom: 1.2rem;
    display: block;
  }

  button {
    background: white;
    color: #39004d;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-size: 0.95rem;
    transition: 0.3s;

    &:hover {
      background-color: #eee;
    }
  }
`;
