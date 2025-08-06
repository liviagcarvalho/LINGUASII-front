import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
  font-size: 1.2rem;
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
    margin-left: 0.4rem;
    text-decoration: none;
    color: #4b007d;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TeacherText = styled.p`
  margin-top: 1rem;
  font-size: 0.85rem;

  a {
    color: #4b007d;
    font-weight: 600;
    margin-left: 0.3rem;
    text-decoration: none;

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

const LoginPage: React.FC = () => {
  return (
    <Container>
      <LeftSide>
        <BackButton to="/">
          <FaArrowLeft />
          Voltar
        </BackButton>

        <Form>
          <Title>Welcome Back!</Title>

          <Label>Username:</Label>
          <Input type="text" placeholder="Enter username" />

          <Label>Password:</Label>
          <Input type="password" placeholder="Enter password" />

          <Button type="submit">Login</Button>

          <RegisterText>
            Don’t have an account?
            <Link to="/register">Register</Link>
          </RegisterText>

          <TeacherText>
            É professor?
            <Link to="/professor-login">Clique aqui</Link>
          </TeacherText>
        </Form>

        <DecorativeShape />
      </LeftSide>

      <RightSide />
    </Container>
  );
};

export default LoginPage;
