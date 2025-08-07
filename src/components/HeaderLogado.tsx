// Header.tsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

// STYLED COMPONENTS
const HeaderContainer = styled.header`
  width: 100%;
  max-width: 100vw;
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  overflow-x: hidden;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #6a0dad;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #6a0dad;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const LoginLink = styled(Link)`
  color: #6a0dad;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.45rem 0;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterLink = styled(Link)`
  background-color: #6a0dad;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  padding: 0.45rem 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const IconLink = styled(Link)`
  font-size: 2rem;
  color: #4a457a;
  display: flex;
  align-items: center;

  &:hover {
    color: #6a0dad;
  }
`;

// COMPONENT
const HeaderLogado = () => {
  const { isAuthenticated, user } = useAuth();
  const isAluno = isAuthenticated && user && !user.is_professor;

  return (
    <HeaderContainer>
      <Logo>LinguaLab</Logo>

      <Nav>
        <NavLink to="/home-logado">Home</NavLink>
        <NavLink to="/sobre-logado">Sobre</NavLink>
        <NavLink to="/aulas-logado">Aulas</NavLink>
        {isAluno && (
          <>
            <NavLink to="/reservas">Reservar</NavLink>
            <NavLink to="/compras">Comprar</NavLink>
          </>
        )}
      </Nav>

      <ButtonGroup>
        {isAluno ? (
          <IconLink to="/perfil">
            <FaUserCircle />
          </IconLink>
        ) : (
          <>
            <LoginLink to="/login">Login</LoginLink>
            <RegisterLink to="/register">Registre-se</RegisterLink>
          </>
        )}
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default HeaderLogado;
