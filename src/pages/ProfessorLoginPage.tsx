import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ProfessorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemErro("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagemErro(data.detail || "Erro ao fazer login.");
        return;
      }

      const payload = JSON.parse(atob(data.access_token.split(".")[1]));

      if (!payload.is_professor) {
        setMensagemErro("Esta conta não é de professor. Use a página de login de alunos.");
        return;
      }

      localStorage.setItem("token", data.access_token);
      navigate("/professor-dashboard"); // Altere se necessário

    } catch (err) {
      setMensagemErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <Container>
      <LeftSide>
        <BackButton to="/">
          <FaArrowLeft />
          Voltar
        </BackButton>

        <Form onSubmit={handleSubmit}>
          <Title>Login do Professor</Title>

          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label>Senha:</Label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {mensagemErro && <ErrorMsg>{mensagemErro}</ErrorMsg>}

          <Button type="submit">Entrar</Button>

          <RegisterText>
            É aluno?
            <Link to="/login">Clique aqui para voltar</Link>
          </RegisterText>
        </Form>

        <DecorativeShape />
      </LeftSide>

      <RightSide />
    </Container>
  );
};

export default ProfessorLoginPage;

// ⬇️ Styled Components (sem mudanças grandes além do novo <ErrorMsg />)

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const LeftSide = styled.div`
  flex: 1.2;
  background-color: #e2dce4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RightSide = styled.div`
  flex: 0.8;
  background-color: #4b007d;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b007d;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;

  svg {
    font-size: 1rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: 1px solid #4b007d;
  margin-bottom: 1.2rem;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: #32004b;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #55009d;
  }
`;

const RegisterText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;

  a {
    font-weight: 600;
    text-decoration: none;
    color: #4b007d;
    margin-left: 0.3rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 160px;
  height: 160px;
  background-color: #4b007d;
  border-top-right-radius: 100%;
  box-shadow: -12px -12px 0 0 #d8bfdc;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
