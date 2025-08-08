import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding-bottom: 1rem;
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
    font-size: 1.2rem;
    margin: 0.5rem 0 1.2rem 0;
    font-weight: bold;
    color: #300244;
  }

  button {
    background-color: #39004d;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1rem;
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
};

const AulaCard = ({ title, img }: Props) => {
  const navigate = useNavigate();

  const handleVerMais = () => {
    navigate("/aulas");
  };

  return (
    <Card>
      <ImageWrapper>
        <Badge>Best Seller</Badge>
        <img src={img} alt={title} />
      </ImageWrapper>
      <Info>
        <h3>{title}</h3>
      </Info>
    </Card>
  );
};

export default AulaCard;
