import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5rem 1rem;
  background-color: white;
`;

const Container = styled.div`
  width: 1018px;
  background-color: rgba(76, 0, 95, 0.05);
  border: 1px solid #4a0057;
  border-radius: 30px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  color: #4a0057;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 1.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  resize: none;
`;

const Button = styled.button`
  background-color: #4a0057;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #32004b;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
  text-align: center;
`;

const ContactSupportForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !mensagem) {
      setErro(true);
    } else {
      alert("Informações enviadas com sucesso!");
      setNome("");
      setEmail("");
      setMensagem("");
      setErro(false);
    }
  };

  return (
    <Section>
      <Container>
        <Title>Central de Apoio ao Cliente</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Digite seu Nome e Sobrenome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextArea
            placeholder="Nos conte seu problema aqui"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <Button type="submit">Enviar</Button>
          {erro && (
            <ErrorMessage>
              Por favor, preencha todos os campos antes de enviar.
            </ErrorMessage>
          )}
        </form>
      </Container>
    </Section>
  );
};

export default ContactSupportForm;
