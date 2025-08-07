// src/pages/PerfilAluno.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderLogado from "../components/HeaderLogado";
import FundoUser from "../assets/User/FundoUser.png";
import AulaCard from "../components/AulaCardAgendada";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const PerfilAluno = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [creditos, setCreditos] = useState<number | null>(null);

  const agendamentos = [
    {
      title: "Etiqueta Digital",
      img: "https://images.unsplash.com/photo-1612832021082-d3e03d4cf3b3",
      duracao: "1 hora",
      data: "12/08/2025 às 19:00",
    },
    {
      title: "Marketing",
      img: "https://images.unsplash.com/photo-1556761175-129418cb2dfe",
      duracao: "1 hora",
      data: "15/08/2025 às 17:00",
    },
    {
      title: "Finanças e Contabilidade",
      img: "https://images.unsplash.com/photo-1581091012184-7f097b1b1d0d",
      duracao: "1 hora",
      data: "18/08/2025 às 14:00",
    },
  ];

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Erro ao buscar perfil:", data.detail);
          return;
        }

        setCreditos(data.usuario.creditos);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <HeaderLogado />

      <Banner>
        <img src={FundoUser} alt="Fundo Perfil" />
        <OverlayText>Bem-vindo, {user?.username}!</OverlayText>
      </Banner>

      <MainContent>
        <Creditos>
          <h2>
            Créditos Restantes: <span>{creditos !== null ? creditos : "..."}</span>
          </h2>
          <LinkMais to="/compras">Adquira Mais Aqui</LinkMais>
        </Creditos>

        <Agendamentos>
          <h2>
            Agendamentos: <span>{agendamentos.length}</span>
          </h2>
          <CardsContainer>
            {agendamentos.map((aula, index) => (
              <AulaCard
                key={index}
                title={aula.title}
                img={aula.img}
                duracao={aula.duracao}
                dataHora={aula.data}
              />
            ))}
          </CardsContainer>
        </Agendamentos>

        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </MainContent>
    </>
  );
};

export default PerfilAluno;

// ========== Styled Components ==========

const Banner = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OverlayText = styled.h1`
  position: absolute;
  top: 2rem;
  left: 3rem;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const MainContent = styled.div`
  padding: 2rem 3rem;
  font-family: "Poppins", sans-serif;
`;

const Creditos = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #300244;

    span {
      color: black;
    }
  }
`;

const LinkMais = styled(Link)`
  display: block;
  margin-top: 0.3rem;
  color: #300244;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Agendamentos = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;

    span {
      color: black;
    }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #39004d;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    text-decoration: underline;
  }
`;
