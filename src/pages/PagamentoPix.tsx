import React from "react";
import styled from "styled-components";
import HeaderLogado from "../components/HeaderLogado";
import { useLocation, useNavigate } from "react-router-dom";

const PagamentoPix = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pacote = location.state;

  const handleConfirmar = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/comprar-creditos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pacote.creditos),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao adicionar créditos:", data.detail);
        alert("Não foi possível finalizar a compra.");
        return;
      }

      alert(`Pagamento confirmado! Créditos atualizados: ${data.creditos}`);
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      alert("Erro de conexão ao confirmar o pagamento.");
    }
  };

  return (
    <>
      <HeaderLogado />

      <Section>
        <Title>Pagamento via Pix</Title>

        {pacote && (
          <PacoteInfo>
            <p><strong>Pacote:</strong> {pacote.creditos} crédito{pacote.creditos > 1 && "s"}</p>
            <p><strong>Valor:</strong> {pacote.preco}</p>
          </PacoteInfo>
        )}

        <Subtitle>
          Escaneie o QR Code abaixo com seu app bancário para concluir o pagamento:
        </Subtitle>

        <QrCode
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://lingualab-pix.com&size=200x200"
          alt="QR Code Pix"
        />

        <ConfirmButton onClick={handleConfirmar}>
          Pagamento Feito! Voltar para Perfil!
        </ConfirmButton>
      </Section>
    </>
  );
};

export default PagamentoPix;

// ======== STYLED COMPONENTS ========

const Section = styled.section`
  padding: 4rem 2rem;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #39004d;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const PacoteInfo = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;

  p {
    font-size: 1rem;
    color: #39004d;
    margin: 0.2rem 0;
  }
`;

const QrCode = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
`;

const ConfirmButton = styled.button`
  background-color: #39004d;
  color: white;
  border: none;
  padding: 0.8rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #520066;
  }
`;
