// src/components/AulaCardAgendada.tsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding-bottom: 1rem;
  width: 220px;
`;

const Badge = styled.div`
  background: crimson;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 1.2rem;

  h3 {
    font-size: 1.1rem;
    margin: 0.5rem 0 0.5rem 0;
    font-weight: bold;
    color: #300244;
  }

  p {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 1rem;
  }

  button {
    background-color: #39004d;
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #520066;
    }
  }
`;

type Props = {
  title: string;
  img: string;
  duracao: string;
  dataHora: string;
};

const AulaCardAgendada = ({ title, img, duracao, dataHora }: Props) => {
  return (
    <Card>
      <ImageWrapper>
        <Badge>Best Seller</Badge>
        <img src={img} alt={title} />
      </ImageWrapper>
      <Info>
        <h3>{title}</h3>
        <p>Duração: {duracao}</p>
        <button>{dataHora}</button>
      </Info>
    </Card>
  );
};

export default AulaCardAgendada;
