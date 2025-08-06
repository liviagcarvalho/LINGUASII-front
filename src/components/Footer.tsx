import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #32004b;
  color: white;
  padding: 3rem 2rem 2rem;
  font-family: "Poppins", sans-serif;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;


const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  gap: 0.8rem;
`;



const CenterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;


const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const Contact = styled.div`
  margin-top: 1.5rem;
  font-size: 0.95rem;

  strong {
    font-size: 1rem;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 1.4rem;
  align-items: center;
  margin-top: 4rem;

  a {
    color: white;
    transition: color 0.2s ease;

    &:hover {
      color: #a26dd2;
    }
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.75rem;
  margin-top: 2rem;
  opacity: 0.8;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
    <Content>
        {/* Bloco esquerdo: Fale Conosco */}
        <Left>
        <Contact>
            <strong>FALE CONOSCO:</strong>
            <br />
            LinguaLab-central@gmail.com <br />
            +55 (11) 8265-3746
        </Contact>
        </Left>

        {/* Bloco central: Logo + Navegação */}
        <HeaderBlock>
        <Logo>LinguaLab</Logo>
        <NavLinks>
            <span>EMPRESA</span>
            <span>ADMINISTRADOR</span>
            <span>PROFESSORES</span>
        </NavLinks>
        </HeaderBlock>

        {/* Bloco direito: redes sociais */}
        <Socials>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedinIn /></a>
        </Socials>
    </Content>

    <Copyright>
        2025 LinguaLab – Todos os direitos reservados | Política de Privacidade | Termos de uso
    </Copyright>
    </FooterContainer>
    );
};


export default Footer;
