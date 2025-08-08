import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderLogado from "../components/HeaderLogado";
import FundoUser from "../assets/User/FundoUser.png";
import AulaCard from "../components/AulaCardAgendada";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // <<<<< Ícone de logout

type ReservaAPI = {
  id: string;
  titulo?: string | null;
  tipo: "particular" | "grupo";
  lingua: "ingles" | "espanhol";
  data: string;
  creditos: number;
  professor_nome?: string | null;
  link_meet?: string | null;
};

const PerfilAluno = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [creditos, setCreditos] = useState<number | null>(null);
  const [reservas, setReservas] = useState<ReservaAPI[]>([]);
  const token = localStorage.getItem("token");

  const carregarPerfil = async () => {
    if (!token) return;
    const r = await fetch("http://localhost:8000/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    if (r.ok) setCreditos(d.usuario.creditos);
  };

  const carregarReservas = async () => {
    if (!token) return;
    const r = await fetch("http://localhost:8000/minhas-reservas", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    if (r.ok) setReservas(d);
    else console.error(d?.detail || "Erro ao carregar reservas");
  };

  useEffect(() => {
    carregarPerfil();
    carregarReservas();

    const onCreditos = (e: any) => setCreditos(e.detail);
    window.addEventListener("creditos-atualizados", onCreditos as any);
    return () => window.removeEventListener("creditos-atualizados", onCreditos as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fmtDataHora = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

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
            Agendamentos: <span>{reservas.length}</span>
          </h2>

          <CardsContainer>
            {reservas.map((a) => (
              <AulaCard
                key={a.id}
                title={a.titulo || "Aula"}
                duracao="1 hora"
                dataHora={fmtDataHora(a.data)}
                meetLink={a.link_meet || undefined}
              />
            ))}
            {reservas.length === 0 && <p>Você ainda não possui aulas reservadas.</p>}
          </CardsContainer>
        </Agendamentos>

        <LogoutButton onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Sair</span>
        </LogoutButton>
      </MainContent>
    </>
  );
};

export default PerfilAluno;

// ==== styled ====
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #39004d;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #520066;
  }
`;
