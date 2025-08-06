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
  flex: 1;
  background-color: #e2dce4;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Shape = styled.div`
  width: 220px;
  height: 800px;
  background: #4b007d;
  border-bottom-left-radius: 80px;
  border-top-left-radius: 0;
  border-top-right-radius: 80px;
  z-index: 2;
`;

const Shadow = styled.div`
  position: absolute;
  left: 110px;
  width: 240px;
  height: 800px;
  background: #cda2db;
  border-bottom-left-radius: 200px;
  border-top-right-radius: -50px;
  z-index: 1;
`;

const RightSide = styled.div`
  flex: 1;
  background-color: #e2dce4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  max-width: 320px;
  background: none;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: 1px solid #4b007d;
  margin-bottom: 1rem;
  outline: none;
  font-size: 0.95rem;
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

const LoginText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;

  span {
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.4rem;
  }
`;

const RegisterPage: React.FC = () => {
  return (
    <Container>
      <LeftSide>
        <Shadow />
        <Shape />
      </LeftSide>

      <RightSide>
        <BackButton to="/">
          <FaArrowLeft />
          Voltar
        </BackButton>

        <Form>
          <Title>Please Fill out form to Register!</Title>

          <Label>Full name:</Label>
          <Input type="text" placeholder="Your full name" />

          <Label>Username:</Label>
          <Input type="text" placeholder="Choose a username" />

          <Label>Email:</Label>
          <Input type="email" placeholder="Enter your email" />

          <Label>Password:</Label>
          <Input type="password" placeholder="Create a password" />

          <Label>Confirm Password:</Label>
          <Input type="password" placeholder="Repeat your password" />

          <Button type="submit">Register</Button>

          <LoginText>
            Yes I have an account? <span><Link to="/login">Login</Link></span>
          </LoginText>
        </Form>
      </RightSide>
    </Container>
  );
};

export default RegisterPage;